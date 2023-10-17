const init = function() {

var selfURL = new URL(window.location.href)
const BASE_URL = selfURL.origin + selfURL.pathname

if (!window.hasOwnProperty('APP_KEY')) {
    window.APP_KEY  = 'AmbientUserData'
}
useStge()
const AMP_STATUS = initStatus()

/**
 * Initialize AMP_STATUS object.
 */
function initStatus() {
    removeStge()
    const baseObj = window.$ambient || {}
    return Object.assign(baseObj, {
        prev: null,
        current: null,
        next: null,
        ctg: -1,
        category: null,
        playlist: null,
        media: null,
        order: 'normal',
        playertype: null,
        options: null,
    })
}

// Window sizes container
const currentWindowSize = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// Advance preparation for using YouTube players.
var tag = document.createElement('script')
tag.src = 'https://www.youtube.com/player_api'
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
var player

// seek container
var seekId

/**
 * Abort seek for playback media.
 */
function abortSeeking() {
    clearInterval(seekId)
    seekId = null
}

/**
 * Watcher for AMP_STATUS object.
 */
function watchState() {
    const callback = function(prop, oldValue, newValue) {
        //logger(`callback(${prop}):`, oldValue, '->', newValue)
        switch (true) {
            case /^(prev|current|next|ctg|order)$/i.test(prop):
                // Synchronize to the saved data of web storage when specific properties of AMP_STATUS object are changed.
                saveStge(prop, newValue)
                if ('current' === prop) {
                    changePlaylistFocus()
                }
                if ('order' === prop) {
                    changeToggleRandomly()
                }
                break
            case /^media$/i.test(prop):
                //logger(`change "${prop}" of AMP_STATUS:`, newValue)
                togglePlayerControllButtons()
                break
            case /^category$/i.test(prop):
                updateCategory()
                break
            case /^options$/i.test(prop):
                applyOptions()
                break
        }
    }
    Object.keys(AMP_STATUS).forEach((propName) => {
        let value = AMP_STATUS[propName]
        Object.defineProperty(AMP_STATUS, propName, {
            get: () => value,
            set: (newValue) => {
                const oldValue = value
                value = newValue
                //logger(`${propName}:`, oldValue, '->', newValue, oldValue !== newValue)
                if (oldValue !== newValue) {
                    callback(propName, oldValue, value)
                }
            }
        })
    })
}
watchState()

// Process global data passed by the system.
if (AmbientData) {
    if (AmbientData.hasOwnProperty('currentPlaylist')) {
        // If there is only one playlist, load immediately.
        AMP_STATUS.playlist = AmbientData.currentPlaylist
        getPlaylistData(AmbientData.currentPlaylist)
    } else
    if (AmbientData.hasOwnProperty('playlists') && Object.keys(AmbientData.playlists).length > 1) {
        // If there are multiple playlists, do nothing yet.
    }
}

/**
 * Fetch data of specific playlist.
 * 
 * @param {string} playlist 
 */
async function getPlaylistData(playlist) {
    initStatus()
    const endpointURL = `${BASE_URL}playlist/${playlist}`
    const data = await fetchData(endpointURL)
    if (data && data.hasOwnProperty('media')) {
        let media = []
        if (data.media && Object.keys(data.media).length > 0) {
            const categories = Object.keys(data.media)
            categories.forEach((category, cid) => {
                // Assign index number of category to media item.
                if (data.media[category] && data.media[category].length > 0) {
                    media = media.concat(data.media[category].map((item) => {
                        item.catId = cid// Index number of category starting at 0
                        return item
                    }))
                }
            })
            AMP_STATUS.category = categories
        }
        if (media.length > 0) {
            // Filters available media only then Assign unique index number to media item.
            let amid = 0
            media = media.filter((item) => (item.hasOwnProperty('title') && item.title !== '')).map((item) => {
                item.amId = amid// Index number of media starting at 0
                amid++
                return item
            })
        }
        AMP_STATUS.media = media
        updatePlaylist()
    }
    if (data && data.hasOwnProperty('options')) {
        AMP_STATUS.options = data.options
    }
}

// DOM Elements
const $BODY               = document.body
const $ALERT              = document.getElementById('alert-notification')
const $SELECT_PLAYLIST    = document.getElementById('current-playlist')
const $SELECT_CATEGORY    = document.getElementById('target-category')
const $TOGGLE_RANDOMLY    = document.getElementById('toggle-randomly')
const $TOGGLE_SEEKPLAY    = document.getElementById('toggle-seekplay')
const $TOGGLE_DARKMODE    = document.getElementById('toggle-darkmode')
const $DRAWER_PLAYLIST    = document.getElementById('drawer-playlist')
const $LIST_PLAYLIST      = document.getElementById('playlist-list-group')
//const $PLAYLIST_ITEMS   = Array.from($LIST_PLAYLIST.querySelectorAll('a'))
//const $CAROUSEL         = document.getElementById('carousel-container')
const $CAROUSEL_WRAPPER   = document.getElementById('carousel-wrapper')
const $CAROUSEL_PREV      = document.getElementById('data-carousel-prev')
const $CAROUSEL_NEXT      = document.getElementById('data-carousel-next')
const $MEDIA_CAPTION      = document.getElementById('media-caption')
const $EMBED_WRAPPER      = document.getElementById('embed-wrapper')
const $OPTIONAL_CONTAINER = document.getElementById('optional-container')
const $BUTTON_WATCH_TY    = document.getElementById('btn-watch-origin')
const $MENU               = document.getElementById('menu-container')
const $BUTTON_PLAYLIST    = document.getElementById('btn-playlist')
const $BUTTON_REFRESH     = document.getElementById('btn-refresh')
const $BUTTON_PLAY        = document.getElementById('btn-play')
const $BUTTON_PAUSE       = document.getElementById('btn-pause')
const $BUTTON_SETTINGS    = document.getElementById('btn-settings')
const $COLLAPSE_MENU      = document.getElementById('collapse-menu')

/**
 * Method for switching display of alert component.
 * 
 * @param {string | null} state allow "show", "hide" or "hidden" as value.
 */
function toggleAlert(state=null) {
    let shown
    switch (true) {
        case /^show$/i.test(state):
            $ALERT.classList.remove('opacity-0')
            shown = true
            break
        case /^hid(e|den)$/i.test(state):
            $ALERT.classList.add('opacity-0')
            shown = false
            break
        default:
            if ($ALERT.classList.contains('opacity-0')) {
                $ALERT.classList.remove('opacity-0')
                shown = true
            } else {
                $ALERT.classList.add('opacity-0')
                shown = false
            }
            break
    }
    setTimeout(() => {
        if (shown) {
            $ALERT.setAttribute('role', 'alert')
        } else {
            $ALERT.removeAttribute('role')
        }
    }, 1000)
}
toggleAlert('hide')

/**
 * Monitors the state of the playlist drawer component and fires 
 * an event when it is displayed.
 */
watcher($DRAWER_PLAYLIST, (mutation) => {
    if (mutation.attributeName === 'aria-modal' && mutation.target.ariaModal) {
        scrollToFocusItem()
    }
}, { attributes: true, childList: false, subtree: true, attributeFilter: ['aria-modal'] })

/**
 * Monitors the state of the collapse menu component and fires 
 * an event when it is opened.
 */
watcher($COLLAPSE_MENU, (mutation) => {
    if (mutation.attributeName === 'aria-expanded' && mutation.target.ariaExpanded) {
        const is_collapse_open = mutation.target.ariaExpanded === 'true'
        const collapse_item_id = mutation.target.getAttribute('aria-controls')
        if (is_collapse_open) {
            const $COLLAPSE_ITEM = document.getElementById(collapse_item_id)
            $COLLAPSE_ITEM.firstElementChild.setAttribute('style', 'max-height: calc(100vh - 420px)')
            //logger('Open collapse item:', $COLLAPSE_ITEM.firstElementChild)
        }
    }
}, { attributes: true, childList: false, subtree: true, attributeFilter: ['aria-expanded'] })

/**
 * Empty the playlist.
 */
function clearPlaylist() {
    // Clear all items of playlist
    const clone = document.getElementById('no-media').cloneNode(true)
    while($LIST_PLAYLIST.firstChild) {
        $LIST_PLAYLIST.removeChild($LIST_PLAYLIST.firstChild)
    }
    $LIST_PLAYLIST.appendChild(clone)
}

/**
 * Create a playlist from the data of the AMP_STATUS object.
 * 
 * @returns 
 */
function updatePlaylist() {
    clearPlaylist()
    const $LIST_NO_MEDIA = document.getElementById('no-media')
    let is_no_media = (AMP_STATUS.media && AMP_STATUS.media.length == 0)
    //logger('updatePlaylist:', AMP_STATUS.media, !AMP_STATUS.hasOwnProperty('ctg') || AMP_STATUS.ctg == null || Number(AMP_STATUS.ctg) == -1)
    let items = []
    if (!AMP_STATUS.hasOwnProperty('ctg') || AMP_STATUS.ctg == null || Number(AMP_STATUS.ctg) == -1) {
        items = AMP_STATUS.media
    } else {
        items = AMP_STATUS.media.filter((item) => item.catId == AMP_STATUS.ctg)
    }
    is_no_media = items.length == 0
    //logger('updatePlaylist:', is_no_media)
    if (is_no_media) {
        // no playable media
        $LIST_NO_MEDIA.classList.remove('hidden')
        return
    } else {
        $LIST_NO_MEDIA.classList.add('hidden')
    }
    items.forEach((item) => {
        const itemElm = document.createElement('a')
        itemElm.href = '#'
        if (AMP_STATUS.current && AMP_STATUS.current !== null && AMP_STATUS.current === item.amId) {
            itemElm.setAttribute('aria-current', 'true')
            itemElm.setAttribute('class', 'flex items-center gap-2 w-full px-4 py-2 text-white bg-blue-500 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600')
        } else {
            itemElm.setAttribute('class', 'flex items-center gap-2 w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white')
        }
        //itemElm.setAttribute('data-drawer-hide', 'drawer-playlist')
        //itemElm.setAttribute('aria-controls', 'drawer-playlist')
        itemElm.setAttribute('data-playlist-item', item.amId)
        let imageSrc = './views/images/no-media-thumb.svg'
        if ((item.image && item.image !== '') || (item.thumb && item.thumb !== '')) {
            if (AmbientData && AmbientData.imageDir) {
                imageSrc = AmbientData.imageDir + (item.thumb && item.thumb !== '' ? item.thumb : item.image)
            }
        } else
        if (item.videoid && item.videoid !== '') {
            imageSrc = getYoutubeThumbnailURL(item.videoid)
        }
        // Set thumbnail image.
        const imgElm  = document.createElement('img')
        imgElm.setAttribute('src', imageSrc)
        imgElm.classList.add('block', 'h-8', 'w-8', 'rounded', 'object-cover')
        imgElm.setAttribute('alt', mb_strimwidth(item.title, 0, 50, '...'))
        itemElm.appendChild(imgElm)

        let labelText = item.title
        if (format = getOption('playlist')) {
            labelText = filterText(format, item)
        }
        itemElm.append(document.createTextNode(labelText))
        $LIST_PLAYLIST.appendChild(itemElm)
    })
    Array.from($LIST_PLAYLIST.querySelectorAll('a')).forEach((elm) => {
        elm.addEventListener('click', (evt) => {
            playItem(evt.target)
            // Toggle player control buttons shown.
            $BUTTON_PLAY.classList.add('hidden')
            $BUTTON_PAUSE.classList.remove('hidden')
        })
    })
}

/**
 * Get the URL of the thumbnail image of YouTube media.
 * 
 * @param {string} videoid 
 * @returns 
 */
function getYoutubeThumbnailURL(videoid) {
    return 'https://img.youtube.com/vi/' + videoid + '/hqdefault.jpg'
}

/**
 * Clears items in the category selection field in the settings menu.
 */
function clearCategory() {
    const clone = document.getElementById('all-category').cloneNode(true)
    while($SELECT_CATEGORY.firstChild) {
        $SELECT_CATEGORY.removeChild($SELECT_CATEGORY.firstChild)
    }
    $SELECT_CATEGORY.appendChild(clone)
    $SELECT_CATEGORY.firstElementChild.setAttribute('disabled', '')
    $SELECT_CATEGORY.setAttribute('disabled', '')
}

/**
 * Update the items in the category selection field of the settings menu.
 */
function updateCategory() {
    //logger('updateCategory:', AMP_STATUS.category)
    if (AMP_STATUS.category && AMP_STATUS.category.length > 0) {
        AMP_STATUS.category.forEach((catName, catId) => {
            const optElm = document.createElement('option')
            optElm.value = catId
            optElm.textContent = catName
            if (AMP_STATUS.category.length == 1) {
                optElm.setAttribute('selected', 'selected')
            }
            $SELECT_CATEGORY.appendChild(optElm)
        })
    }
    $SELECT_CATEGORY.firstElementChild.removeAttribute('disabled')
    $SELECT_CATEGORY.removeAttribute('disabled')
}

/**
 * Getter for optional data of the AMP_STATUS object.
 * 
 * @param {string} key 
 * @returns Returns null if the specified optional property is not a valid value.
 */
function getOption(key) {
    if (AMP_STATUS.hasOwnProperty('options') && AMP_STATUS.options !== null) {
        if (!AMP_STATUS.options.hasOwnProperty(key) || AMP_STATUS.options[key] === null || AMP_STATUS.options[key] === '') {
            return null
        } else {
            return AMP_STATUS.options[key]
        }
    } else {
        return null
    }
}

/**
 * Causes the application to apply specific option contents of the AMP_STATUS object.
 */
function applyOptions() {
    // Applies if a background image is specified.
    const bgImage = getOption('background')
    if (bgImage && AmbientData && AmbientData.hasOwnProperty('imageDir')) {
        const bgSrc = AmbientData.imageDir + bgImage
        logger('applyOptions:', bgSrc, AMP_STATUS.options )
        $BODY.setAttribute('style', `background-image: url('${bgSrc}');`)
        $BODY.classList.add('bg-no-repeat', 'bg-bottom', 'bg-cover')
        $MENU.setAttribute('style', 'background: linear-gradient(to bottom, rgba(255,255,255,.3), 50%, rgba(255,255,255,1));')
    } else {
        $BODY.removeAttribute('style')
        $BODY.classList.remove('bg-no-repeat', 'bg-bottom', 'bg-cover')
        $MENU.removeAttribute('style')
    }
    // Applies if a randomly playback is specified.
    const isRandom = getOption('random')
    if (isRandom !== null) {
        AMP_STATUS.order = isRandom ? 'random' : 'normal'
    }
    // Applies if a seeking playback is specified.
    const isSeekplay = getOption('seek')
    if (isSeekplay !== null) {
        changeToggleSeekplay()
    }
    // Applies if a dark mode is specified.
    const isDarkMode = getOption('dark')
    logger(AMP_STATUS.options)
    if (isDarkMode !== null) {
        AMP_STATUS.options.dark = isDarkMode
    //} else {
    //    AMP_STATUS.options.dark = false
    } 
    changeToggleDarkmode()
}

/**
 * Clear and initialize the carousel display.
 */
function clearCarousel() {
    const $CAROUSEL_NO_MEDIA = document.createElement('div')
    $CAROUSEL_NO_MEDIA.id = 'carousel-item-1'
    $CAROUSEL_NO_MEDIA.classList.add('hidden', 'duration-700', 'ease-in-out')
    $CAROUSEL_NO_MEDIA.setAttribute('data-carousel-item', '')
    const $NO_MEDIA_IMAGE = document.createElement('img')
    $NO_MEDIA_IMAGE.src = './views/images/no-media-placeholder.svg'
    $NO_MEDIA_IMAGE.setAttribute('class', 'absolute block h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2')
    $NO_MEDIA_IMAGE.setAttribute('alt', 'No media available')
    $CAROUSEL_NO_MEDIA.appendChild($NO_MEDIA_IMAGE)
    const clone = $CAROUSEL_NO_MEDIA.clone(true)
    clone.id = 'carousel-item-2'
    while($CAROUSEL_WRAPPER.firstChild) {
        $CAROUSEL_WRAPPER.removeChild($CAROUSEL_WRAPPER.firstChild)
    }
    $CAROUSEL_WRAPPER.appendChild($CAROUSEL_NO_MEDIA)
    $CAROUSEL_WRAPPER.appendChild(clone)
    $CAROUSEL_PREV.setAttribute('disabled', true)
    $CAROUSEL_NEXT.setAttribute('disabled', true)
}

/**
 * Update the carousel display.
 */
function updateCarousel() {
    let items = []
    if (AMP_STATUS.hasOwnProperty('ctg') && AMP_STATUS.ctg !== null) {
        // do nothing.
    }
    let is_show = false
    if (AMP_STATUS.hasOwnProperty('prev') && AMP_STATUS.prev !== null) {
        items.push(AMP_STATUS.prev)
    }
    if (AMP_STATUS.hasOwnProperty('current') && AMP_STATUS.current !== null) {
        items.push(AMP_STATUS.current)
        is_show = true
    }
    if (AMP_STATUS.hasOwnProperty('next') && AMP_STATUS.next !== null) {
        items.push(AMP_STATUS.next)
    }
    if (!is_show) {
        clearCarousel()
        return
    }
    while($CAROUSEL_WRAPPER.firstChild) {
        $CAROUSEL_WRAPPER.removeChild($CAROUSEL_WRAPPER.firstChild)
    }
    items.forEach((amId, index) => {
        const $COROUSEL_ITEM = document.createElement('div')
        $COROUSEL_ITEM.id = 'carousel-item-' + (index + 1)
        if (amId == AMP_STATUS.current) {
            $COROUSEL_ITEM.classList.add('duration-700', 'ease-in-out')
        } else {
            $COROUSEL_ITEM.classList.add('hidden', 'duration-700', 'ease-in-out')
        }
        $COROUSEL_ITEM.setAttribute('data-carousel-item', amId == AMP_STATUS.current ? 'active' : '')
        const $COROUSEL_ITEM_IMAGE = document.createElement('img')
        let mediaImage = './views/images/no-media-placeholder.svg'
        const mediaData = AMP_STATUS.media.filter((item) => item.amId == amId).shift()
        //logger('updateCarousel:2:', mediaData)
        let base_aspect = 'h-full'
        if (mediaData.hasOwnProperty('image') && mediaData.image !== null && mediaData.image !== '') {
            mediaImage  = AmbientData.imageDir + mediaData.image
            //logger('updateCarousel:3:', mediaImage, mediaData.image, mediaData)
        } else
        if (mediaData.hasOwnProperty('videoid') && mediaData.videoid !== null && mediaData.videoid !== '') {
            mediaImage = getYoutubeThumbnailURL(mediaData.videoid)
            base_aspect = 'w-full'
        }
        $COROUSEL_ITEM_IMAGE.src = mediaImage
        $COROUSEL_ITEM_IMAGE.classList.add('absolute', 'block', base_aspect, '-translate-x-1/2', '-translate-y-1/2', 'top-1/2', 'left-1/2')
        $COROUSEL_ITEM_IMAGE.setAttribute('alt', mediaData.title)
        if (basename(mediaImage) === 'no-media-placeholder' && isObject(AMP_STATUS.options) && AMP_STATUS.options.hasOwnProperty('dark') && AMP_STATUS.options.dark) {
            $COROUSEL_ITEM_IMAGE.setAttribute('style', 'opacity: .7')
        }
        $COROUSEL_ITEM.appendChild($COROUSEL_ITEM_IMAGE)
        $CAROUSEL_WRAPPER.appendChild($COROUSEL_ITEM)
    })
    $CAROUSEL_PREV.removeAttribute('disabled')
    $CAROUSEL_NEXT.removeAttribute('disabled')
}

/**
 * Update the media caption display.
 * @param {Object} mediaData 
 */
function updateMediaCaption(mediaData) {
    const format = getOption('caption') || '%artist% - %title%'
    labelText = filterText(format, mediaData)
    while($MEDIA_CAPTION.firstChild) {
        $MEDIA_CAPTION.removeChild($MEDIA_CAPTION.firstChild)
    }
    //logger('updateMediaCaption:', getOption('caption'), labelText, labelText.match(/<.*?[!^<].*?>/gi))
    if (/<.*?[!^<].*?>/gi.test(labelText)) {
        $MEDIA_CAPTION.innerHTML = labelText
    } else {
        $MEDIA_CAPTION.appendChild(document.createTextNode(labelText))
    }
}

/**
 * Filters text to the specified format.
 */
function filterText(format, mediaData) {
    const patterns = format.match(/%(.+?)%/gi)
    let text = format
    if (patterns.length > 0) {
        patterns.forEach((pattern) => {
            const property = pattern.replaceAll('%', '')
            const replacer = (mediaData.hasOwnProperty(property) && mediaData[property]) ? mediaData[property] : ''
            text = text.replaceAll(`%${property}%`, replacer)
            //logger('filterText:', property, replacer, text)
        })
        text = text.trim().replace(/^[-_‐–−—ー]?(.*)[-_‐–−—ー]?$/, '$1').trim()
    }
    //logger('filterText:', format, patterns, text)
    return text
}


// Event handlings

/**
 * Event listener when the playlist selection field in the settings menu is changed.
 */
$SELECT_PLAYLIST.addEventListener('change', (evt) => {
    let oldPlaylist = null
    if (AMP_STATUS.hasOwnProperty('playlist')) {
        oldPlaylist = AMP_STATUS.playlist
    }
    if (oldPlaylist !== evt.target.value) {
        AMP_STATUS.playlist = evt.target.value
        getPlaylistData(evt.target.value)
        initStatus()
        clearCategory()
    }
})

/**
 * Event listener when the category selection field in the settings menu is changed.
 */
$SELECT_CATEGORY.addEventListener('change', (evt) => {
    let oldCtgId = null
    if (AMP_STATUS.hasOwnProperty('ctg') && AMP_STATUS.ctg !== null) {
        oldCtgId = AMP_STATUS.ctg
    }
    if (oldCtgId !== evt.target.value) {
        AMP_STATUS.ctg = Number(evt.target.value)
        AMP_STATUS.prev    = null
        AMP_STATUS.current = null
        AMP_STATUS.next    = null
    }
    updatePlaylist()
})

/**
 * Event listener when the button of "previous" for carousel has been clicked.
 */
$CAROUSEL_PREV.addEventListener('click', (evt) => {
    playItem(evt.target, AMP_STATUS.prev)
})

/**
 * Event listener when the button of "next" for carousel has been clicked.
 */
$CAROUSEL_NEXT.addEventListener('click', (evt) => {
    playItem(evt.target, AMP_STATUS.next)
})

/**
 * Event listener when the button of "refresh" in bottom menu has been clicked.
 */
$BUTTON_REFRESH.addEventListener('click', (evt) => {
    reloadPage()
})

/**
 * Toggle the display of player controls button after media loaded.
 */
function togglePlayerControllButtons() {
    if (AMP_STATUS.media !== null && AMP_STATUS.media.length > 0) {
        // There are activated when available media are set.
        $BUTTON_PLAY.removeAttribute('disabled')
        $BUTTON_PAUSE.removeAttribute('disabled')
    } else {
        // There are deactivated when no available media.
        $BUTTON_PLAY.setAttribute('disabled', true)
        $BUTTON_PLAY.classList.remove('hidden')
        $BUTTON_PAUSE.setAttribute('disabled', true)
        $BUTTON_PAUSE.classList.add('hidden')
    }
}

/**
 * Event listener when the "play" button in bottom menu has been clicked.
 */
$BUTTON_PLAY.addEventListener('click', (evt) => {
    let playableIds = AMP_STATUS.media.map((item) => item.amId) 
    if (AMP_STATUS.ctg > -1) {
        playableIds = AMP_STATUS.media.filter((item) => item.catId == AMP_STATUS.ctg).map((item) => item.amId)
    }
    let playId
    if (AMP_STATUS.current !== null) {
        playId = AMP_STATUS.current
    } else {
        if (AMP_STATUS.order === 'random') {
            playId = playableIds[Math.floor(Math.random() * playableIds.length)]
        } else {
            playId = playableIds.shift()
        }
    }
    if (AMP_STATUS.playertype === 'youtube' && player) {
        const YTPstate = player.getPlayerState()
        //logger('"Play" the YouTube Player:', YTPstate)
        if (YTPstate != 1) {
            player.playVideo()
        }
    } else
    if (/^(audio|video)$/i.test(AMP_STATUS.playertype)) {
        const _elms = document.getElementsByTagName(AMP_STATUS.playertype)
        const playerElm = _elms[0]
        playerElm.play()
    } else {
        playItem(null, playId)
    }
    // Toggle this button shown.
    $BUTTON_PLAY.classList.add('hidden')
    $BUTTON_PAUSE.classList.remove('hidden')
})

/**
 * Event listener when the "pause" button in bottom menu has been clicked.
 */
$BUTTON_PAUSE.addEventListener('click', (evt) => {
    if (!AMP_STATUS.hasOwnProperty('playertype') || AMP_STATUS.playertype === null || AMP_STATUS.playertype === '') {
        return false
    }
    if (AMP_STATUS.playertype === 'youtube' && player) {
        if (player.getPlayerState() == 1) {
            player.pauseVideo()
        } else {
            player.stopVideo()
        }
    } else 
    if (/^(audio|video)$/i.test(AMP_STATUS.playertype)) {
        const _elms = document.getElementsByTagName(AMP_STATUS.playertype)
        const playerElm = _elms[0]
        playerElm.pause()
    } else {
        // Deactivate their player control buttons.
        $BUTTON_PLAY.setAttribute('disabled', true)
        $BUTTON_PLAY.classList.remove('hidden')
        $BUTTON_PAUSE.setAttribute('disabled', true)
        $BUTTON_PAUSE.classList.add('hidden')
    }
    // Toggle this button shown.
    $BUTTON_PAUSE.classList.add('hidden')
    $BUTTON_PLAY.classList.remove('hidden')
})

/**
 * Toggle style to focus the active item in a playlist.
 */
function changePlaylistFocus() {
    // Change the focus of playlist.
    Array.from($LIST_PLAYLIST.querySelectorAll('a')).forEach((elm) => {
        if (AMP_STATUS.current !== null && elm.dataset.playlistItem == AMP_STATUS.current) {
            elm.setAttribute('aria-current', 'true')
            elm.setAttribute('class', 'flex items-center gap-2 w-full px-4 py-2 text-white bg-blue-500 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600')
            activeRect = getRect(elm)
        } else {
            elm.removeAttribute('aria-current')
            elm.setAttribute('class', 'flex items-center gap-2 w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white')
        }
    })
    scrollToFocusItem()
}

/**
 * Auto-scroll to active item in playlist.
 */
function scrollToFocusItem() {
    const targetElm = $LIST_PLAYLIST.querySelector('a[aria-current="true"]')
    const elmRect = getRect(targetElm)
    if (elmRect) {
        let move = targetElm.offsetTop > $LIST_PLAYLIST.clientHeight ? Math.abs($LIST_PLAYLIST.clientHeight - targetElm.offsetTop) + elmRect.height : 0
        $LIST_PLAYLIST.scrollTo({top: move, behavior: 'smooth'})
        //logger('scrollToFocusItem:', activeRect, targetElm.offsetTop, $LIST_PLAYLIST.clientHeight, $LIST_PLAYLIST.offsetTop, move, $LIST_PLAYLIST.scrollHeight)
    }
}

/**
 * Event listener when changing the randomly of settings menu toggle button.
 */
$TOGGLE_RANDOMLY.querySelector('input[type="checkbox"]').addEventListener('change', (evt) => {
    AMP_STATUS.order = evt.target.checked ? 'random' : 'normal'
})

/**
 * Toggle the randomly of settings menu toggle button.
 */
function changeToggleRandomly() {
    const toggleElm = $TOGGLE_RANDOMLY.querySelector('input[type="checkbox"]')
    toggleElm.checked = AMP_STATUS.order === 'random'
}

/**
 * Event listener when changing the seekplay of settings menu toggle button.
 */
$TOGGLE_SEEKPLAY.querySelector('input[type="checkbox"]').addEventListener('change', (evt) => {
    if (isObject(AMP_STATUS.options) && AMP_STATUS.options.hasOwnProperty('seek')) {
        AMP_STATUS.options.seek = evt.target.checked
    }
})

/**
 * Toggle the seekplay of settings menu toggle button.
 */
function changeToggleSeekplay() {
    const toggleElm = $TOGGLE_SEEKPLAY.querySelector('input[type="checkbox"]')
    toggleElm.checked = !!AMP_STATUS.options.seek
}

/**
 * Event listener when changing the darkmode of settings menu toggle button.
 */
$TOGGLE_DARKMODE.querySelector('input[type="checkbox"]').addEventListener('change', (evt) => {
    if (!isObject(AMP_STATUS.options)) {
        AMP_STATUS.options = { dark: evt.target.checked }
    } else {
        if (AMP_STATUS.options.hasOwnProperty('dark')) {
            AMP_STATUS.options.dark = evt.target.checked
        } else {
            AMP_STATUS.options = Object.assign(AMP_STATUS.options, { dark: evt.target.checked })
        }
    }
    changeToggleDarkmode()
})

/**
 * Toggle the darkmode of settings menu toggle button.
 */
function changeToggleDarkmode() {
    const toggleElm  = $TOGGLE_DARKMODE.querySelector('input[type="checkbox"]')
    const isDarkmode = isObject(AMP_STATUS.options) && AMP_STATUS.options.hasOwnProperty('dark') ? !!AMP_STATUS.options.dark : false
    toggleElm.checked = isDarkmode
    if (isDarkmode) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
    const $CAROUSEL_ITEMS = Array.from(document.querySelectorAll('[id^="carousel-item-"]'))
    $CAROUSEL_ITEMS.forEach((item) => {
        const isNoImage = basename(item.firstElementChild.src) === 'ambient-placeholder'
        //logger('changeToggleDarkmode:', basename(item.firstElementChild.src), isNoImage)
        if (isDarkmode) {
            setStyles(item, 'opacity: .7')
        } else {
            setStyles(item)
        }
    })
    const $AUDIO_PLAYER = document.getElementsByTagName('audio')
    if ($AUDIO_PLAYER.length == 1 && isElement($AUDIO_PLAYER[0])) {
        if (isDarkmode) {
            setStyles($AUDIO_PLAYER[0], 'opacity: .7')
        } else {
            setStyles($AUDIO_PLAYER[0])
        }
        //logger('changeToggleDarkmode:', $AUDIO_PLAYER[0])
    }
}


/**
 * Toggle the display of backdrop for drawer.
 */
function toggleDrawerBackdrop() {
    const backdropElm = document.querySelector('div[drawer-backdrop]')
    if (currentWindowSize.width >= 1320) {
        $BUTTON_PLAYLIST.setAttribute('data-drawer-backdrop', 'false')
        $BUTTON_SETTINGS.setAttribute('data-drawer-backdrop', 'false')
        if (isElement(backdropElm)) {
            backdropElm.classList.add('hidden')
        }
    } else {
        $BUTTON_PLAYLIST.setAttribute('data-drawer-backdrop', 'true')
        $BUTTON_PLAYLIST.setAttribute('data-drawer-backdrop', 'true')
        if (isElement(backdropElm)) {
            backdropElm.classList.remove('hidden')
        }
    }
}
toggleDrawerBackdrop()

/**
 * Updates the user's media playback state.
 * By giving this function the ID you want to play, it will generate a media 
 * configuration that includes the previous and next playback IDs according 
 * to the playback order.
 * 
 * @param {number} currentAmId 
 */
function updatePlayStatus(currentAmId) {
    // Set looking ahead to the next index.
    const targetData = AMP_STATUS.ctg != null && AMP_STATUS.ctg != -1 ? AMP_STATUS.media.filter((item) => item.catId == AMP_STATUS.ctg) : AMP_STATUS.media
    let idCandidates = targetData.map((item) => item.amId)
    //logger('playItem:', AMP_STATUS.ctg, idCandidates)
    AMP_STATUS.current = currentAmId
    let prevId = null
    let nextId = null
    if (AMP_STATUS.order === 'random') {
        if (idCandidates.length > 1) {
            idCandidates = idCandidates.filter((v) => v != currentAmId)
        }
        prevId = idCandidates[Math.floor(Math.random() * idCandidates.length)]
        nextId = idCandidates[Math.floor(Math.random() * idCandidates.length)]
    } else {
        idCandidates.forEach((_v, _i) => {
            if (_v == currentAmId) {
                prevId = _i == 0 ? idCandidates[idCandidates.length - 1] : idCandidates[_i - 1]
                nextId = idCandidates.length == _i + 1 ? idCandidates[0] : idCandidates[_i + 1]
                return false
            }
        })
    }
    AMP_STATUS.prev = prevId
    AMP_STATUS.next = nextId
    //logger('playItem:', prevId, currentAmId, nextId, AMP_STATUS)
    updateCarousel()
}

/**
 * Commit a media item to play.
 * This function is intended to be called from a playlist item click event, 
 * but it can also be called independently by specifying the media ID directly 
 * or from an event listener on an element with the data-playlist-item attribute.
 * 
 * @param {Object | null} object 
 * @param {number | null} id 
 */
function playItem(object=null, id=null) {
    const thisElm = isElement(object) ? object : (object !== null ? object.target : null)
    const amId = id !== null ? id : (thisElm.dataset.playlistItem ? Number(thisElm.dataset.playlistItem) : 0) 
    const mediaData = AMP_STATUS.media.filter((item) => item.amId == amId).shift()
    let mediaSrc   = null
    let playerType = null
    if (mediaData.hasOwnProperty('file') && mediaData.file !== '') {
        mediaSrc = mediaData.file
        playerType = 'html'
    }
    if (mediaData.hasOwnProperty('videoid') && mediaData.videoid !== '') {
        mediaSrc = mediaData.videoid
        playerType = 'youtube'
    }
    //logger('playItem:', amId, mediaSrc, playerType)
    updatePlayStatus(amId)
    if (currentWindowSize.width < 1320) {
        // Hide drawers
        document.getElementById('btn-close-playlist').click()
        document.getElementById('btn-close-settings').click()
    }
    setupPlayer(playerType, mediaSrc, mediaData)
}

/**
 * Handle the player to prepare depending on the type of media to play.
 * 
 * @param {string} type "youtube" or "html" only 
 * @param {string} src 
 * @param {Object} mediaData 
 */
function setupPlayer(type, src, mediaData) {
    // update media caption.
    updateMediaCaption(mediaData)
    switch(true) {
        case /^YouTube$/i.test(type):
            AMP_STATUS.playertype = type
            createYTPlayer(mediaData)
            break
        case /^HTML$/i.test(type):
            const extension = getExt(src)
            //logger('setupPlayer:', extension)
            if (/^(aac|midi?|mp3|m4a|ogg|opus|wav|weba|wma)$/i.test(extension)) {
                AMP_STATUS.playertype = 'audio'
                createPlayerTag('audio', mediaData)
            } else
            if (/^(avi|mpe?g|mp4|ogv|ts|webm|3g(p|2))$/i.test(extension)) {
                AMP_STATUS.playertype = 'video'
                createPlayerTag('video', mediaData)
            } else {
                AMP_STATUS.playertype = null
                throw new Error('Unsupported file format')
            }
            break
        default:
            AMP_STATUS.playertype = null
            playItem(null, AMP_STATUS.next)
            throw new Error('Unsupported player specified.')
    }
}

/**
 * Event handler that is called when the YouTube player is ready to play.
 * 
 * @param {Object} event 
 */
function onPlayerReady(event) {
    // from: flex justify-center border border-gray-500 rounded-lg overflow-hidden transition-all duration-150 ease-out w-full h-0 opacity-0
    // to:   flex justify-center border border-gray-500 rounded-lg overflow-hidden transition-all duration-150 ease-out w-max h-max
    $EMBED_WRAPPER.classList.add('w-max', 'h-max')
    $EMBED_WRAPPER.classList.remove('w-full', 'h-0', 'opacity-0')

    if (youtubeURL = player.getVideoUrl()) {
        $BUTTON_WATCH_TY.href = youtubeURL
    } else {
        $BUTTON_WATCH_TY.href = 'https://www.youtube.com/watch?v=' + mediaData.videoid
    }

    setTimeout(() => {
        $BUTTON_WATCH_TY.removeAttribute('disabled')
        $OPTIONAL_CONTAINER.classList.remove('hidden', 'opacity-0')
    }, 500)

    event.target.setVolume(100)
    event.target.playVideo()
}

/**
 * Event handler called when the state of the YouTube player changes.
 * 
 * @param {Object} event 
 */
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        // from: flex justify-center border border-gray-500 rounded-lg overflow-hidden transition-all duration-150 ease-out w-max h-max
        // to:   flex justify-center border border-gray-500 rounded-lg overflow-hidden transition-all duration-150 ease-out w-full h-0 opacity-0
        $EMBED_WRAPPER.classList.add('w-full', 'h-0', 'opacity-0')
        $EMBED_WRAPPER.classList.remove('w-max', 'h-max')

        $BUTTON_WATCH_TY.href = '#'
        $BUTTON_WATCH_TY.setAttribute('disabled', '')
        $OPTIONAL_CONTAINER.classList.add('hidden', 'opacity-0')
    
        const nextId = AMP_STATUS.next || 0
        const mediaData = AMP_STATUS.media.filter((item) => item.amId == nextId).shift()
        let mediaSrc   = null
        let playerType = null
        if (mediaData.hasOwnProperty('file') && mediaData.file !== '') {
            mediaSrc = mediaData.file
            playerType = 'html'
            player.destroy()
        }
        if (mediaData.hasOwnProperty('videoid') && mediaData.videoid !== '') {
            mediaSrc = mediaData.videoid
            playerType = 'youtube'
        }
        updatePlayStatus(nextId)
        setupPlayer(playerType, mediaSrc, mediaData)
    }
    if (event.data == YT.PlayerState.PAUSED) {
        // Toggle this button shown (Pause -> Play).
        $BUTTON_PAUSE.classList.add('hidden')
        $BUTTON_PLAY.classList.remove('hidden')
    }
    if (event.data == YT.PlayerState.PLAYING) {
        // Toggle this button shown (Play -> Pause).
        $BUTTON_PLAY.classList.add('hidden')
        $BUTTON_PAUSE.classList.remove('hidden')
    }
}

/**
 * Event handler called when the YouTube player encounters an error.
 * 
 * @param {Object} event 
 */
function onPlayerError(event) {
    // Skip if media playback fails.
    logger('error', 'onYTPlayerError:', event.data, mediaData, 'force')
    // from: flex justify-center border border-gray-500 rounded-lg overflow-hidden transition-all duration-150 ease-out w-max h-max
    // to:   flex justify-center border border-gray-500 rounded-lg overflow-hidden transition-all duration-150 ease-out w-full h-0 opacity-0
    $EMBED_WRAPPER.classList.add('w-full', 'h-0', 'opacity-0')
    $EMBED_WRAPPER.classList.remove('w-max', 'h-max')

    $BUTTON_WATCH_TY.href = '#'
    $BUTTON_WATCH_TY.setAttribute('disabled', '')
    $OPTIONAL_CONTAINER.classList.add('hidden', 'opacity-0')

    const nextId = AMP_STATUS.next
    const mediaData = AMP_STATUS.media.filter((item) => item.amId == nextId).shift()
    let mediaSrc   = null
    let playerType = null
    if (mediaData.hasOwnProperty('file') && mediaData.file !== '') {
        mediaSrc = mediaData.file
        playerType = 'html'
        player.destroy()
    }
    if (mediaData.hasOwnProperty('videoid') && mediaData.videoid !== '') {
        mediaSrc = mediaData.videoid
        playerType = 'youtube'
    }
    updatePlayStatus(nextId)
    setupPlayer(playerType, mediaSrc, mediaData)
}

/**
 * Create a YouTube player.
 * 
 * @param {Object} mediaData 
 */
function createYTPlayer(mediaData) {
    const playerElm = document.createElement('div')
    playerElm.id = 'ytplayer'
    while($EMBED_WRAPPER.firstChild) {
        $EMBED_WRAPPER.removeChild($EMBED_WRAPPER.firstChild)
    }
    $EMBED_WRAPPER.appendChild(playerElm)

    const playerOptions = {
        autoplay: 1,
        controls: 1,
        fs: 0,
        cc_load_policy: 0,
        rel: 0,
    }
    if (optAutoplay = getOption('autoplay')) {
        playerOptions.autoplay = Number(optAutoplay)
    }
    if (optControls = getOption('controls')) {
        playerOptions.controls = Number(optControls)
    }
    if (optFs = getOption('fs')) {
        playerOptions.fs = Number(optFs)
    }
    if (optCLP = getOption('cc_load_policy')) {
        playerOptions.cc_load_policy = Number(optCLP)
    }
    if (optRel = getOption('rel')) {
        playerOptions.rel = Number(optRel)
    }
    if (getOption('seek') && mediaData.hasOwnProperty('start') && mediaData.start !== '') {
        playerOptions.start = mediaData.start
    }
    if (getOption('seek') && mediaData.hasOwnProperty('end') && mediaData.end !== '') {
        playerOptions.end = mediaData.end
    }
    //logger('createYTPlayer:', mediaData, playerOptions)
    player = new YT.Player('ytplayer', {
        height: currentWindowSize.width >= 640 ? 360 : 216,
        width: currentWindowSize.width >= 640 ? 640 : 384,
        videoId: mediaData.videoid,
        playerVars: playerOptions,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError,
        },
    })
}

/**
 * Create a media playback player using HTML.
 * 
 * @param {string} tagname "audio" or "video"
 * @param {Object} mediaData 
 */
function createPlayerTag(tagname, mediaData) {
    const playerElm = document.createElement(tagname)
    const sourceElm = document.createElement('source')
    playerElm.id = 'audio-player'
    playerElm.setAttribute('controls', true)
    playerElm.setAttribute('controlslist', 'nodownload')
    playerElm.setAttribute('autoplay', true)
    if (tagname === 'audio' && isObject(AMP_STATUS.options) && AMP_STATUS.options.hasOwnProperty('dark') && AMP_STATUS.options.dark) {
        setStyles(playerElm, 'opacity: .7')
    }
    if (getOption('seek') && mediaData.hasOwnProperty('start') && mediaData.start !== '') {
        playerElm.currentTime = mediaData.start
    }
    sourceElm.src = mediaData.file
    sourceElm.setAttribute('type', `audio/${getExt(mediaData.file)}`)
    playerElm.appendChild(sourceElm)
    while($EMBED_WRAPPER.firstChild) {
        $EMBED_WRAPPER.removeChild($EMBED_WRAPPER.firstChild)
    }
    $EMBED_WRAPPER.appendChild(playerElm)
    // from: flex justify-center border border-gray-500 rounded-lg overflow-hidden transition-all duration-150 ease-out w-full h-0 opacity-0
    // to:   flex justify-center        border-gray-500 rounded-lg overflow-hidden transition-all duration-150 ease-out w-max h-max border-0
    $EMBED_WRAPPER.classList.add('max-w-2xl', 'w-max', 'h-max', 'border-0')
    $EMBED_WRAPPER.classList.remove('border', 'w-full', 'h-0', 'opacity-0')

    $BUTTON_WATCH_TY.href = '#'
    $BUTTON_WATCH_TY.setAttribute('disabled', '')
    $OPTIONAL_CONTAINER.classList.add('hidden', 'opacity-0')

    playerElm.addEventListener('play', (evt) => {
        if (getOption('seek') && mediaData.hasOwnProperty('end') && mediaData.end !== '') {
            // When the seek end time is reached, forcibly seeks to the end of the media and ends playback.
            if (!seekId) {
                seekId = setInterval(() => {
                    if (evt.target.currentTime >= mediaData.end) {
                        evt.target.currentTime = evt.target.duration
                        abortSeeking()
                    }
                    //logger('Now seeking:', seekId, evt.target.currentTime)
                }, 500)
            }
        }
    })

    playerElm.addEventListener('playing', (evt) => {
        // Toggle this button shown (Play -> Pause).
        $BUTTON_PLAY.classList.add('hidden')
        $BUTTON_PAUSE.classList.remove('hidden')
    })

    playerElm.addEventListener('pause', (evt) => {
        // Toggle this button shown (Pause -> Play).
        $BUTTON_PAUSE.classList.add('hidden')
        $BUTTON_PLAY.classList.remove('hidden')
    })

    playerElm.addEventListener('ended', (evt) => {
        // from: flex justify-center        border-gray-500 rounded-lg overflow-hidden transition-all duration-150 ease-out w-max h-max border-0
        // to:   flex justify-center border border-gray-500 rounded-lg overflow-hidden transition-all duration-150 ease-out w-full h-0 opacity-0
        $EMBED_WRAPPER.classList.add('border', 'w-full', 'h-0', 'opacity-0')
        $EMBED_WRAPPER.classList.remove('max-w-2xl', 'w-max', 'h-max', 'border-0')

        abortSeeking()

        const nextId = AMP_STATUS.next
        const mediaData = AMP_STATUS.media.filter((item) => item.amId == nextId).shift()
        let mediaSrc   = null
        let playerType = null
        if (mediaData.hasOwnProperty('file') && mediaData.file !== '') {
            mediaSrc = mediaData.file
            playerType = 'html'
        }
        if (mediaData.hasOwnProperty('videoid') && mediaData.videoid !== '') {
            mediaSrc = mediaData.videoid
            playerType = 'youtube'
            evt.target.remove()
        }
        updatePlayStatus(nextId)
        setupPlayer(playerType, mediaSrc, mediaData)
    })

    playerElm.addEventListener('error', (evt) => {
        logger('error', 'Player Error:', mediaData, evt, 'force')
    })

    playerElm.addEventListener('loadstart', (evt) => {
        // If the readyState does not change 1 second after the start of loading, 
        // it is skipped as an unsupported medium.
        setTimeout(() => {
            if (evt.target.readyState == 0) {
                logger('warn', `The player will treat this media (${mediaData.file}) as unsupported and will skip it.`, 'force')
                evt.target.dispatchEvent(new Event('ended'))
            }
        }, 1500)
    })

    playerElm.addEventListener('loadedmetadata', (evt) => {
        const self = evt.target
        if (self.tagName === 'VIDEO') {
            //logger('loadedmetadata:', `videoSize(${self.videoWidth} x ${self.videoHeight})`)
            if (!self.videoHeight || !self.videoWidth) {
                self.setAttribute('poster', './views/images/no-media-placeholder.svg')
            }
            if (currentWindowSize.width >= 640) {
                self.width  = 640
                self.height = Math.floor((640 * self.videoHeight) / self.videoWidth)
            } else {
                self.width  = 384
                self.height = Math.floor((384 * self.videoHeight) / self.videoWidth)
            }
        }
    })
}

/**
 * Restart this application.
 */
function reloadPage() {
    window.location.reload()
}

// Globals

/**
 * Event handler when the window size is resized.
 */
function updateWindowSize() {
    currentWindowSize.width  = window.innerWidth
    currentWindowSize.height = window.innerHeight
    logger('updateWindowSize:', currentWindowSize)
    if (player && typeof player === 'object' && typeof player.getIframe === 'function') {
        const elm = player.getIframe()
        if (currentWindowSize.width >= 640) {
            elm.width  = 640
            elm.height = 360
        } else {
            elm.width  = 384
            elm.height = 216
        }
    }
    toggleDrawerBackdrop()
}

window.addEventListener('resize', updateWindowSize)

};// end init()

// Below are the utility functions: ---------------------------------------------------------------

/**
 * Finds whether the given variable is an object.
 * 
 * @param {any} value 
 * @returns 
 */
function isObject(value) {
    return value !== null && "object" === typeof value 
}

/**
 * Finds whether the given variable is an element of HTML.
 * 
 * @param {any} node 
 * @returns 
 */
function isElement(node) {
    return !(!node || !(node.nodeName || node.prop && node.attr && node.find))
}

/**
 * Determines if the given variable is a numeric string.
 * 
 * @param {any} numstr 
 * @returns 
 */
function isNumberString(numstr) {
    return "string" == typeof numstr && "" !== numstr && !isNaN(numstr)
}

/**
 * Determines if the given variable is a boolean string.
 * @param {any} boolstr 
 * @returns 
 */
function isBooleanString(boolstr) {
    return "string" == typeof boolstr && "" !== boolstr && /^(true|false)$/i.test(boolstr)
}

/**
 * Given a string containing the path to a file or directory, 
 * this function will return the trailing name component.
 * If the given path ends in a file, only the file name without 
 * the extension is returned.
 * 
 * @param {any} path 
 * @returns 
 */
function basename(path) {
    return path.split(/[\/\\]/).pop().split('.').shift();
}

/**
 * Gets the extension from the given file path.
 * 
 * @param {any} path 
 * @returns 
 */
function getExt(path) {
    return path.split('.').pop()
}

/*
function filterValue(val, withDecodeURI=!1, castNumeric=!1, castLogged=!1) {
    console.log(val)
    let objType;
    switch (typeof val) {
    case "string":
        return /%([0-9a-f-A-F]{2})+/.test(val) ? (withDecodeURI && castLogged && logger("filterValue.decodeURI:", {
            origin: val,
            decoded: decodeURI(val)
        }),
        withDecodeURI ? decodeURI(val) : val) : /^[+,-]?([1-9]\d*|0)(\.\d+)?$/.test(val) ? (castNumeric && castLogged && logger("filterValue.castNumeric:", {
            origin: val,
            casted: Number(val)
        }),
        castNumeric ? Number(val) : val) : val;
    case "object":
        if (objType = Object.prototype.toString.call(val).replace(/^\[object\s(.*)\]$/, "$1"),
        "Object" === objType) {
            if (withDecodeURI && !val.hasOwnProperty("origin") && !val.hasOwnProperty("decoded"))
                for (const prop in val)
                    val[prop] = filterValue(val[prop], withDecodeURI, castNumeric, castLogged);
            return val
        }
        return "Array" === objType ? val.map(item=>filterValue(item, withDecodeURI, castNumeric, castLogged)) : val;
    default:
        return val
    }
}
*/

function getOS() {
    let ua;
    return "userAgentData"in window.navigator ? (ua = navigator.userAgentData,
    ua.platform) : (ua = navigator.userAgent,
    /android/i.test(ua) ? "Android" : /iPad|iPhone|iPod/.test(ua) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 ? "iOS" : "Other")
}

/**
 * Retrieves a DOMRect object providing information about the size 
 * of given an element and its position relative to the viewport.
 * This function as a wrapper of  Element.getBoundingClientRect() 
 * method.
 * 
 * @param {Object} targetElement 
 * @param {string | null} property 
 * @returns 
 */
function getRect(targetElement, property="") {
    if (isElement(targetElement)) {
        const _RECT_OBJ = targetElement.getBoundingClientRect();
        if ("" === property)
            return _RECT_OBJ;
        if (Object.getPrototypeOf(_RECT_OBJ).hasOwnProperty(property))
            return _RECT_OBJ[property]
    }
    return !1
}

function toggleClass(targetElement, classes, force) {
    return isElement(targetElement) && (classes = Array.isArray(classes) ? classes : [classes]).length > 0 && classes.forEach(oneClass=>{
        if ("object" == typeof oneClass)
            for (const property in oneClass)
                "boolean" == typeof oneClass[property] && targetElement.classList.toggle(property, oneClass[property]);
        else
            "string" == typeof oneClass && (void 0 === force ? targetElement.classList.toggle(oneClass) : targetElement.classList.toggle(oneClass, force))
    }
    ),
    !1
}

function setStyles(targetElements, styles="") {
    const _ELMS = undefined;
    (targetElements instanceof Array ? targetElements : [targetElements]).map(elm=>{
        if (styles instanceof Object)
            for (const _prop in styles)
                elm.style[_prop] = styles[_prop];
        else
            elm.style.cssText = String(styles)
    }
    )
}

function getAtts(targetElement, attribute="") {
    const _ATTS = targetElement.getAttributeNames();
    if (0 != _ATTS.length) {
        if ("" === attribute) {
            let _obj = {};
            return _ATTS.forEach(item=>{
                let _val = targetElement.getAttribute(item);
                _obj[item] = isNumberString(_val) ? Number(_val) : isBooleanString(_val) ? /^true$/i.test(_val) : _val
            }
            ),
            _obj
        }
        if (_ATTS.includes(attribute)) {
            let _val = targetElement.getAttribute(attribute);
            return isNumberString(_val) ? Number(_val) : isBooleanString(_val) ? /^true$/i.test(_val) : _val
        }
    }
}

/**
 * Set or remove attributes on the specified element.
 * 
 * @param {Object | Array} targetElements The object given should be a HTMLElement
 * @param {Object} attributes Given an object can be specified multiple attribute name and value pairs
 * @param {bool} remove If this remove flag is enabled, the corresponding attribute will be removed
 */
function setAtts(targetElements, attributes={}, remove=false) {
    //logger('setAtts:', targetElements, attributes, remove);
    (targetElements instanceof Array ? targetElements : [targetElements]).map(elm=>{
        for (const _key in attributes)
            !remove ? elm.setAttribute(_key, attributes[_key]) : elm.removeAttribute(_key)
    })
}

function hide(targetElements) {
    const _ELMS = undefined;
    (targetElements instanceof Array ? targetElements : [targetElements]).map(elm=>{
        replaceAttribute(elm, "style", "data-cached-style"),
        replaceAttribute(elm, "class", "data-cached-class"),
        setStyles(elm, "display: none !important")
    }
    )
}

function show(targetElements) {
    const _ELMS = undefined;
    (targetElements instanceof Array ? targetElements : [targetElements]).map(elm=>{
        replaceAttribute(elm, "data-cached-style", "style"),
        replaceAttribute(elm, "data-cached-class", "class")
    }
    )
}

function isHidden(targetElement, checkProperties) {
    if (!isElement(targetElement))
        return !1;
    const elmStyles = window.getComputedStyle(targetElement)
      , elmStatus = {};
    return checkProperties ? checkProperties instanceof Array || (checkProperties = [checkProperties]) : checkProperties = ["display", "opacity", "visibility"],
    checkProperties.forEach(prop=>{
        elmStatus[prop] = elmStyles.getPropertyValue(prop)
    }
    ),
    elmStatus.hidden = getAtts(targetElement, "hidden"),
    elmStatus.hidden || "none" === elmStatus.display || 0 == Number(elmStatus.opacity) || "hidden" === elmStatus.visibility
}

function replaceTagName(targetElement, tagName) {
    if (!isElement(targetElement))
        return targetElement;
    const replacement = document.createElement(tagName);
    return Array.from(targetElement.attributes).forEach(attribute=>{
        const {nodeName: nodeName, nodeValue: nodeValue} = attribute;
        nodeValue && replacement.setAttribute(nodeName, nodeValue)
    }
    ),
    Array.from(targetElement.childNodes).forEach(node=>{
        replacement.appendChild(node)
    }
    ),
    targetElement.parentNode.replaceChild(replacement, targetElement),
    replacement
}

function replaceAttribute(targetElement, attributeName, replacementName) {
    const attrValue = targetElement.getAttribute(attributeName)
      , prevAttr = {};
    return !(!isElement(targetElement) || !attrValue) && (targetElement.setAttribute(replacementName, attrValue),
    targetElement.removeAttribute(attributeName),
    prevAttr[attributeName] = attrValue,
    prevAttr)
}

function strToNode(str) {
    const parser = undefined
      , node = undefined;
    return (new DOMParser).parseFromString(str, "text/html")
}

/**
 * Returns the width of string string, where halfwidth characters count as 1, 
 * and fullwidth characters count as 2.
 * 
 * @param {string} str 
 * @returns 
 */
function mb_strwidth(str) {
    var i = 0,
        l = str.length,
        c = '',
        length = 0
    for (;i<l;i++) {
        c = str.charCodeAt(i);
        if (0x0000 <= c && c <= 0x0019) {
            length += 0
        } else if (0x0020 <= c && c <= 0x1FFF) {
            length += 1
        } else if (0x2000 <= c && c <= 0xFF60) {
            length += 2
        } else if (0xFF61 <= c && c <= 0xFF9F) {
            length += 1
        } else if (0xFFA0 <= c) {
            length += 2
        }
    }
    return length
}

/**
 * Truncates string string to specified width, where halfwidth characters 
 * count as 1, and fullwidth characters count as 2.
 * 
 * @param {string} str 
 * @param {int} start 
 * @param {int} width 
 * @param {string | null} trimmarker 
 * @returns 
 */
function mb_strimwidth(str, start, width, trimmarker) {
    if (typeof trimmarker === 'undefined') trimmarker = ''
    const trimmakerWidth = mb_strwidth(trimmarker)
    var i = start,
        l = str.length,
        trimmedLength = 0,
        trimmedStr = ''
    for (;i < l; i++) {
        var c = str.charAt(i),
            charWidth = mb_strwidth(c),
            next = str.charAt(i + 1),
            nextWidth = mb_strwidth(next)
        trimmedLength += charWidth
        trimmedStr += c
        if (trimmedLength + trimmakerWidth + nextWidth > width) {
            trimmedStr += trimmarker
            break
        }
    }
    return trimmedStr
}

/*
function getFieldData(idOrName, attrName="") {
    let nodes = document.getElementById(idOrName) ? [document.getElementById(idOrName)] : Array.from(document.querySelectorAll(`[name="${idOrName}"]`));
    if (nodes = nodes.filter(node=>isElement(node) && /^(INPUT|TEXTAREA|SELECT)$/i.test(node.nodeName)),
    0 == nodes.length)
        return null;
    let retval = [];
    return nodes.forEach(node=>{
        let atts = getAtts(node);
        switch (node.nodeName) {
        case "SELECT":
            node.options.length > 0 && (atts.options = Array.from(node.options).map(opt=>({
                value: opt.value,
                label: opt.label,
                selected: opt.selected
            })),
            atts.selectedIndex = node.selectedIndex);
            break;
        case "INPUT":
            "checkbox" !== node.type && "radio" !== node.type || atts.hasOwnProperty("checked") && (atts.checked = "checked" === atts.checked);
            break;
        case "TEXTAREA":
            atts.width = getRect(node, "width"),
            atts.height = getRect(node, "height")
        }
        "" !== attrName ? ("SELECT" === node.nodeName && "seleted" === attrName && (attrName = "selectedIndex"),
        retval.push(atts.hasOwnProperty(attrName) ? atts[attrName] : null)) : retval.push(atts)
    }
    ),
    1 == retval.length ? retval[0] : retval
}
*/

/**
 * Watches the specified element.
 * This function as a wrapper for MutationObserver.
 * 
 * @param {Object} targetElements 
 * @param {function} callback 
 * @param {Object | null} config 
 * @returns 
 */
function watcher(targetElements, callback, config={}) {
    const _ELMS = targetElements instanceof Array ? targetElements : [targetElements];
    if (!callback || "function" != typeof callback)
        return !1;
    const _CONF = Object.assign({
        childList: !0,
        attributes: !0,
        characterData: !0,
        subtree: !0
    }, config);
    _ELMS.map(elm=>{
        if (!isElement(elm))
            return logger("error", "Watching target is not an HTML element.", !0),
            !1;
        const observer = undefined;
        return new MutationObserver(mutations=>{
            mutations.forEach(mutation=>{
                callback(mutation)
            }
            )
        }
        ).observe(elm, _CONF)
    }
    )
}

/**
 * Fetch data using the specified URL and method.
 * This function as a wrapper for Fetch API.
 * 
 * @param {string} url 
 * @param {string | null} method 
 * @param {Object | null} data 
 * @param {string | null} datatype 
 * @param {int | null} timeout 
 * @returns 
 */
async function fetchData(url="", method="get", data={}, datatype="json", timeout=15e3) {
    const controller = new AbortController, 
          timeoutId  = setTimeout(() => {
            controller.abort()
          }, timeout);
    if (!url || !/^(get|post|put|delete|patch)$/i.test(method))
        return Promise.reject({
            type: "bad_request",
            status: 400,
            message: "Invalid argument(s) given."
        });
    let params = new URLSearchParams, 
        sendData = {};
    if (sendData = {
        method: method,
        mode: "cors",
        cache: "no-cache",
        credentials: "omit",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        signal: controller.signal
    }, data)
        for (let key in data)
            Object.prototype.hasOwnProperty.call(data, key) && params.append(key, data[key]);
    if ("get" !== method) {
        sendData.body = params
    } else {
        if (params.size > 0) {
            url += "?" + params
        }
        //logger("fetchData::before:", url, method, data, params, sendData)
    }
    try {
        const response = await fetch(url, sendData);
        //logger("fetchData::after:", response)
        if (response.ok) {
            const retval = "json" === datatype ? await response.json() : await response.text();
            //logger("fetchData::after:2:", retval)
            return Promise.resolve(retval.data)
        } else {
            const errObj = await response.json();
            return Promise.reject({
                code: errObj.code,
                status: errObj.data.status,
                message: errObj.message
            })
        }
    } catch (err) {
        logger("error", "fetchData::error:", err, "force")
    } finally {
        clearTimeout(timeoutId)
    }
}

/**
 * Set the storage for saving user data on the client side to be used.
 * 
 * @param {string} stge 
 */
function useStge(stge="localStorage") {
    if (window.$ambient) {
        window.$ambient.useStorage = stge
    } else {
        window.$ambient = { useStorage: stge }
    }
}

/**
 * Store user data in client-side storage.
 * 
 * @param {string} key 
 * @param {any} data 
 * @returns 
 */
function saveStge(key, data) {
    const _data = window[window.$ambient.useStorage].getItem(APP_KEY)
    if (!_data) {
        const newData = {}
        newData[key] = data
        window[window.$ambient.useStorage].setItem(APP_KEY, JSON.stringify(newData))
        return true
    }
    try {
        const userData = JSON.parse(_data)
        if (isObject(userData)) {
            userData[key] = data
            window[window.$ambient.useStorage].setItem(APP_KEY, JSON.stringify(userData))
            return true
        }
    } catch (error) {
        logger(error, _data)
    }
    return false
}

/**
 * Load user data from client-side storage.
 * 
 * @param {string} key 
 * @returns 
 */
function loadStge(key) {
    const _data = window[window.$ambient.useStorage].getItem(APP_KEY)
    try {
        const userData = JSON.parse(_data)
        if (isObject(userData) && userData.hasOwnProperty(key)) 
            return userData[key];
    } catch (error) {
        logger(error, _data)
    }
    return null
}

/**
 * Removes specific properties from user data stored in client-side storage.
 * If no property name is specified, deletes the entire user data.
 * 
 * @param {string | null} key 
 * @returns 
 */
function removeStge(key=null) {
    if (!key) {
        window[window.$ambient.useStorage].removeItem(APP_KEY)
        return true
    }
    const _data = window[window.$ambient.useStorage].getItem(APP_KEY)
    try {
        const userData = JSON.parse(_data)
        if (isObject(userData) && userData.hasOwnProperty(key)) { 
            delete userData[key]
            window[window.$ambient.useStorage].setItem(APP_KEY, JSON.stringify(userData))
            return true
        }
    } catch (error) {
        logger(error, _data)
    }
    return false
}

/**
 * Logger for frontend of Ambient Media Player.
 * 
 * @param  {...any} args 
 * @returns 
 */
function logger(...args) {
    let isForce = AmbientData.hasOwnProperty('debug') ? AmbientData.debug : false
    if (args.length > 0 && "string" == typeof args[args.length - 1] && args[args.length - 1] === 'force') {
        isForce = args.pop() === 'force'
    }
    if (!isForce) {
        return
    }
    const now = new Date,
        dateStr = `[${"" + now.getFullYear()}/${("0" + (now.getMonth() + 1)).slice(-2)}/${("0" + now.getDate()).slice(-2)} ${("0" + now.getHours()).slice(-2)}:${("0" + now.getMinutes()).slice(-2)}:${("0" + now.getSeconds()).slice(-2)}]`,
        type = /^(error|warn|info|debug|log)$/i.test(args[0]) ? args.shift() : "log"
    //args = args.map(item=>filterValue(item, !0, !1, !0)),
    return console[type](dateStr, ...args)
}

// Do dispatcher
"complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? init() : document.addEventListener ? document.addEventListener("DOMContentLoaded", init, !1) : window.onload = init;
