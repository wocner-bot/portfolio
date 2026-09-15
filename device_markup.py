from html import escape

PHONE_IMAGES = {'parking.png', 'parking-detail.png', 'pricing.png', 'pricing-detail.png'}
LANDSCAPE_IMAGES = {'beeline.png', 'beeline-detail.png', 'cargo.png'}

def device_markup(filename, caption):
    orientation = ' device--landscape' if filename in LANDSCAPE_IMAGES else ''
    tone = ' device--light' if filename.startswith(('parking', 'marketing')) else ''
    return f'<span class="device-mockup{orientation}{tone}"><span class="device-screen"><img class="device-interface" src="/assets/{escape(filename, quote=True)}" alt="{escape(caption, quote=True)}" loading="lazy"></span><img class="device-frame" src="/assets/iphone-18-pro-frame.png" alt="" aria-hidden="true" loading="lazy"></span>'
