import fs from 'node:fs';
import path from 'node:path';
import {load} from 'cheerio';
const dist='dist';
const designs={
 studio:{kit:'Bootstrap',css:'bootstrap/dist/css/bootstrap.min.css',card:'card',body:'card-body',button:'btn btn-primary',tag:'badge rounded-pill text-bg-light',font:'inter'},
 editorial:{kit:'Bulma',css:'bulma/css/bulma.min.css',card:'card',body:'card-content',button:'button is-dark',tag:'tag is-light',font:'newsreader'},
 gallery:{kit:'UIkit',css:'uikit/dist/css/uikit.min.css',card:'uk-card uk-card-secondary',body:'uk-card-body',button:'uk-button uk-button-default',tag:'uk-label',font:'manrope'},
 bold:{kit:'Semantic UI',css:'semantic-ui-css/semantic.min.css',card:'ui fluid card',body:'content',button:'ui black button',tag:'ui label',font:'space-grotesk'}
};
fs.mkdirSync('dist/vendor',{recursive:true});
fs.mkdirSync('dist/fonts',{recursive:true});
for(const [id,d] of Object.entries(designs)){
 let css=fs.readFileSync('node_modules/'+d.css,'utf8');
 // No runtime font CDN requests; the portfolio uses locally hosted fonts.
 css=css.replace(/@import[^;]+;/g,'').replace(/\/\*# sourceMappingURL=.*?\*\//g,'');
 fs.writeFileSync(`dist/vendor/${id}.css`,css);
 const pkg=d.css.split('/')[0];
 for(const file of ['LICENSE','LICENSE.md','LICENSE.txt']) if(fs.existsSync(`node_modules/${pkg}/${file}`)) {fs.writeFileSync(`dist/vendor/${id}-LICENSE.txt`,fs.readFileSync(`node_modules/${pkg}/${file}`,"utf8").trimEnd()+"\n");break;}
 const font=`${d.font}-latin-wght-normal.woff2`;
 fs.copyFileSync(`node_modules/@fontsource-variable/${d.font}/files/${font}`,`dist/fonts/${font}`);
 fs.copyFileSync(`node_modules/@fontsource-variable/${d.font}/LICENSE`,`dist/fonts/${d.font}-LICENSE.txt`);
}
const pages=['index.html',...fs.readdirSync('dist/work').map(slug=>`work/${slug}/index.html`)];
for(const [id,d] of Object.entries(designs)) for(const page of pages){
 const $=load(fs.readFileSync(path.join(dist,page),'utf8'));
 $('html').attr('data-design',id).attr('data-theme','light'); // Bulma's light scheme is explicit.
 $('body').addClass('variant');
 $('head').append(`<link rel="stylesheet" href="/vendor/${id}.css"><link rel="stylesheet" href="/designs/common.css?v=1"><link rel="stylesheet" href="/designs/${id}.css?v=1">`);
 // Keep the picker isolated from each framework's reset and generic button rules.
 $('link[href^="/themes.css"]').remove();
 $('head').append('<link rel="stylesheet" href="/themes.css?v=5">');
 $('head').append(`<link rel="canonical" href="https://wocnerg-portfolio.onrender.com/${page==='index.html'?'':page.replace('index.html','')}">`);
 $('title').text($('title').text()+` · ${d.kit}`);
 $('.header').removeClass('header').addClass('v-header');
 $('.contact-nav,.hero-work-link,.case-button').addClass(d.button).addClass('v-button');
 $('.hero-work-link').removeClass('hero-work-link');
 $('.hero').removeClass('hero hero-refined').addClass('v-hero');
 for(const cls of ['hero-composition','hero-heading','hero-role','hero-skills-layout','hero-experience','hero-domains','hero-actions','experience-strip']){
  $('.'+cls).removeClass(cls).addClass('v-'+cls);
 }
 $('.v-hero-domains li').addClass(d.tag);
 $('.v-hero .hero-video').wrap('<div class="v-motion" aria-hidden="true"></div>');
 $('.v-hero .round-link').remove();
 $('.project').removeClass('project').addClass('v-project '+d.card);
 $('.project-info').removeClass('project-info').addClass('v-card-body '+d.body);
 $('.project-grid').addClass('v-project-grid');
 $('.expertise span').addClass(d.tag);
 $('.case-detail').addClass(d.card);
 $('.case-facts').addClass(id==='bold'?'ui segment':id==='editorial'?'box':id==='gallery'?'uk-card uk-card-body':'card card-body');
 $('.case-toolbar nav').addClass(id==='studio'?'nav nav-pills':id==='editorial'?'tabs':id==='gallery'?'uk-subnav':'ui secondary menu');
 $('.case-toolbar nav a').addClass(id==='studio'?'nav-link':id==='bold'?'item':'');
 $('.v-header nav').addClass(id==='studio'?'nav':id==='gallery'?'uk-flex uk-flex-middle':id==='bold'?'ui secondary menu':'');
 $('.v-header nav>a:not(.contact-nav)').addClass(id==='bold'?'item':id==='studio'?'nav-link':'');
 // Internal navigation stays inside the selected design, including home anchors.
 $('a[href]').each((_,el)=>{const a=$(el),href=a.attr('href');if(href.startsWith('/')&&!href.startsWith('//')&&!href.startsWith('/assets/')) a.attr('href',`/design/${id}${href}`);});
 const out=path.join(dist,'design',id,page);fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,$.html());
}
console.log(`Built ${pages.length*Object.keys(designs).length} pages with four independent UI kits.`);
