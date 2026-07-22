/* ========================================
   ⚙️ CUSTOMIZABLE CONFIGURATION
   Edit this section to add/remove members and customize your clock!
   ======================================== */

// 📋 GROUP MEMBERS - EDIT THIS LIST TO ADD MORE MEMBERS
// Format: { name: 'Name', timezone: 'IANA/Timezone', minecraftUsername: 'username' }
// The Minecraft username will be used to fetch the player's skin head from mc-heads.net API
// More timezone examples: 'America/Los_Angeles', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney'
const GROUP_MEMBERS = [
    { name: 'Jay', timezone: 'America/Denver', minecraftUsername: 'XjaylienX' },
    { name: 'Hera', timezone: 'America/Edmonton', minecraftUsername: 'Hera981170' },
    { name: 'Tara', timezone: 'Europe/Vienna', minecraftUsername: 'Tarantulophie' },
    { name: 'Colin', timezone: 'Europe/London', minecraftUsername: 'Collins_plays' },
    { name: 'Ae', timezone: 'America/New_York', minecraftUsername: 'AE_just_vibing' },
    { name: 'Violet', timezone: 'America/New_York', minecraftUsername: 'VioletCloude80' },
    { name: 'Artemis', timezone: 'America/Calgary', minecraftUsername: 'Art3mis015' },
    { name: 'Siri', timezone: 'America/Chicago', minecraftUsername: 'MermiadSparkle' }
    // Add more members here! They will automatically group by timezone
];

// 🎨 CUSTOMIZE HEADER
const HEADER_CONFIG = {
    icon: '⏰',           // Change to any emoji
    title: 'OurCraft Studio',
    tagline: 'World Clock'
};

// 🎨 CUSTOMIZE COLORS (optional - CSS variables take precedence)
const COLORS = {
    accentColor: '#ff6b35',        // Primary highlight color
    secondaryAccent: '#ff8c42',    // Secondary highlight
    textPrimary: '#e8e8e8',        // Main text
    textSecondary: '#a0a0a0'       // Muted text
};

// 🎮 MINECRAFT SKIN SETTINGS
const SKIN_CONFIG = {
    size: 80,              // Size in pixels for the head render
    api: 'mc-heads'        // API to use: 'mc-heads' (CORS enabled) or 'minotar'
};

/* ========================================
   🕐 ANALOG CLOCK FUNCTIONS
   ======================================== */

/**
 * Update analog clock hands to show current time
 * @param {HTMLElement} svgElement - The SVG clock element
 * @param {Date} date - The date/time to display
 */
function updateAnalogClock(svgElement, date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    // Calculate smooth hand positions
    const totalSeconds = seconds + milliseconds / 1000;
    const secondDegrees = (totalSeconds / 60) * 360;

    const totalMinutes = minutes + totalSeconds / 60;
    const minuteDegrees = (totalMinutes / 60) * 360;

    const totalHours = (hours % 12) + totalMinutes / 60;
    const hourDegrees = (totalHours / 12) * 360;

    // Update hand rotations
    const hourHand = svgElement.querySelector('.hour-hand');
    const minuteHand = svgElement.querySelector('.minute-hand');
    const secondHand = svgElement.querySelector('.second-hand');

    if (hourHand) hourHand.setAttribute('transform', `rotate(${hourDegrees} 100 100)`);
    if (minuteHand) minuteHand.setAttribute('transform', `rotate(${minuteDegrees} 100 100)`);
    if (secondHand) secondHand.setAttribute('transform', `rotate(${secondDegrees} 100 100)`);
}

/**
 * Create an SVG analog clock element
 * @returns {HTMLElement} - SVG element
 */
function createAnalogClockSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('class', 'analog-clock');

    svg.innerHTML = `
        <!-- Clock face -->
        <circle cx="100" cy="100" r="95" class="clock-face"/>
        
        <!-- Hour markers -->
        <g class="hour-markers">
            <line x1="100" y1="10" x2="100" y2="25" class="major-marker"/>
            <line x1="100" y1="10" x2="100" y2="20" class="minor-marker" transform="rotate(30 100 100)"/>
            <line x1="100" y1="10" x2="100" y2="20" class="minor-marker" transform="rotate(60 100 100)"/>
            <line x1="100" y1="10" x2="100" y2="25" class="major-marker" transform="rotate(90 100 100)"/>
            <line x1="100" y1="10" x2="100" y2="20" class="minor-marker" transform="rotate(120 100 100)"/>
            <line x1="100" y1="10" x2="100" y2="20" class="minor-marker" transform="rotate(150 100 100)"/>
            <line x1="100" y1="10" x2="100" y2="25" class="major-marker" transform="rotate(180 100 100)"/>
            <line x1="100" y1="10" x2="100" y2="20" class="minor-marker" transform="rotate(210 100 100)"/>
            <line x1="100" y1="10" x2="100" y2="20" class="minor-marker" transform="rotate(240 100 100)"/>
            <line x1="100" y1="10" x2="100" y2="25" class="major-marker" transform="rotate(270 100 100)"/>
            <line x1="100" y1="10" x2="100" y2="20" class="minor-marker" transform="rotate(300 100 100)"/>
            <line x1="100" y1="10" x2="100" y2="20" class="minor-marker" transform="rotate(330 100 100)"/>
        </g>

        <!-- Hour numbers -->
        <text x="100" y="30" class="hour-number" text-anchor="middle">12</text>
        <text x="165" y="105" class="hour-number" text-anchor="middle">3</text>
        <text x="100" y="180" class="hour-number" text-anchor="middle">6</text>
        <text x="35" y="105" class="hour-number" text-anchor="middle">9</text>

        <!-- Clock hands -->
        <g class="clock-hands">
            <line x1="100" y1="100" x2="100" y2="60" class="hour-hand"/>
            <line x1="100" y1="100" x2="100" y2="40" class="minute-hand"/>
            <line x1="100" y1="100" x2="100" y2="35" class="second-hand"/>
        </g>

        <!-- Center dot -->
        <circle cx="100" cy="100" r="5" class="center-dot"/>
    `;

    return svg;
}

/* ========================================
   🕰️ TIME FORMATTING FUNCTIONS
   ======================================== */

/**
 * Format time for 12-hour digital display
 * @param {Date} date - The date object to format
 * @returns {Object} - { time: '12:34:56', period: 'AM' }
 */
function format12HourTime(date) {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12 || 12; // Convert to 12-hour format
    hours = String(hours).padStart(2, '0');

    return {
        time: `${hours}:${minutes}:${seconds}`,
        period: period
    };
}

/**
 * Get the current time in a specific timezone
 * @param {string} timezone - IANA timezone string (e.g., 'America/Denver')
 * @returns {Date} - Date object representing the time in that timezone
 */
function getTimeInTimezone(timezone) {
    const now = new Date();
    
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const parts = formatter.formatToParts(now);
        const partMap = {};
        
        parts.forEach(part => {
            partMap[part.type] = part.value;
        });

        const tzDate = new Date(
            parseInt(partMap.year),
            parseInt(partMap.month) - 1,
            parseInt(partMap.day),
            parseInt(partMap.hour),
            parseInt(partMap.minute),
            parseInt(partMap.second)
        );

        return tzDate;
    } catch (error) {
        console.error(`Invalid timezone: ${timezone}`, error);
        return now; // Fallback to current time
    }
}

/* ========================================
   🎮 MINECRAFT SKIN HEAD FUNCTIONS
   ======================================== */

/**
 * Get Minecraft skin head image URL
 * @param {string} username - Minecraft username
 * @param {number} size - Size in pixels (default: 80)
 * @returns {string} - URL to the skin head image
 */
function getMinecraftHeadURL(username, size = 80) {
    // Using mc-heads.net API - CORS enabled and reliable
    // Format: https://mc-heads.net/avatar/{username}/{size}
    const encodedUsername = encodeURIComponent(username);
    return `https://mc-heads.net/avatar/${encodedUsername}/${size}`;
}

/**
 * Create Minecraft skin head element
 * @param {string} username - Minecraft username
 * @returns {HTMLElement} - The skin head container
 */
function createMinecraftHead(username) {
    const container = document.createElement('div');
    container.className = 'skin-head-container';

    const head = document.createElement('div');
    head.className = 'skin-head loading';

    const img = document.createElement('img');
    img.alt = `${username}'s Minecraft head`;
    img.src = getMinecraftHeadURL(username, SKIN_CONFIG.size);
    img.crossOrigin = 'anonymous';
    img.loading = 'lazy';

    // Handle image load success
    img.addEventListener('load', () => {
        head.classList.remove('loading');
        head.classList.remove('error');
        console.log(`✅ Loaded skin for: ${username}`);
    });

    // Handle image load error (invalid username or network issue)
    img.addEventListener('error', () => {
        head.classList.remove('loading');
        head.classList.add('error');
        console.warn(`Failed to load skin for username: ${username}`);
        // Try fallback API
        console.log(`⚠️ Trying fallback for: ${username}`);
        img.src = `https://crafatar.com/avatars/${username}?size=${SKIN_CONFIG.size}&overlay`;
    });

    head.appendChild(img);
    container.appendChild(head);

    return container;
}

/* ========================================
   🎴 MEMBER CARD GENERATION & UPDATES
   ======================================== */

/**
 * Create a member clock card
 * @param {Object} member - Member object { name, timezone, minecraftUsername }
 * @returns {HTMLElement} - The member card element
 */
function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-clock-card';
    card.setAttribute('data-member', member.name);
    card.setAttribute('data-timezone', member.timezone);

    // Get initial time
    const tzDate = getTimeInTimezone(member.timezone);
    const { time, period } = format12HourTime(tzDate);

    card.innerHTML = `
        <div class="member-info">
            <div class="member-name">${member.name}</div>
            <div class="member-timezone">${member.timezone}</div>
        </div>

        <div class="clock-container">
            <!-- Analog clock will be inserted here -->
        </div>

        <div class="digital-display">
            <div class="digital-time">${time}</div>
            <div class="digital-period">${period}</div>
        </div>
    `;

    // Add Minecraft skin head at the top if username provided
    if (member.minecraftUsername) {
        const skinHead = createMinecraftHead(member.minecraftUsername);
        card.insertBefore(skinHead, card.firstChild);
    }

    // Add the SVG clock
    const clockContainer = card.querySelector('.clock-container');
    const clockSVG = createAnalogClockSVG();
    clockContainer.appendChild(clockSVG);

    // Initial clock update
    updateAnalogClock(clockSVG, tzDate);

    return card;
}

/**
 * Update a single member card with current time
 * @param {HTMLElement} card - The member card element
 */
function updateMemberCard(card) {
    const timezone = card.getAttribute('data-timezone');
    const tzDate = getTimeInTimezone(timezone);
    const { time, period } = format12HourTime(tzDate);

    // Update digital display
    card.querySelector('.digital-time').textContent = time;
    card.querySelector('.digital-period').textContent = period;

    // Update analog clock
    const clockSVG = card.querySelector('.analog-clock');
    if (clockSVG) {
        updateAnalogClock(clockSVG, tzDate);
    }
}

/**
 * Group members by timezone
 * @returns {Map} - Map of timezone -> array of members
 */
function groupMembersByTimezone() {
    const grouped = new Map();
    
    GROUP_MEMBERS.forEach(member => {
        if (!grouped.has(member.timezone)) {
            grouped.set(member.timezone, []);
        }
        grouped.get(member.timezone).push(member);
    });

    return grouped;
}

/**
 * Get timezone display name (e.g., 'Mountain Time', 'Eastern Time')
 * @param {string} timezone - IANA timezone string
 * @returns {string} - Display name
 */
function getTimezoneDisplayName(timezone) {
    const timezoneNames = {
        'America/Denver': 'USA - Mountain Time',
        'America/Edmonton': 'Canada - Mountain Time',
        'America/Calgary': 'Canada - Mountain Standard Time',
        'America/Chicago': 'USA - Central Time',
        'America/New_York': 'USA - Eastern Time',
        'Europe/London': 'Wales - GMT',
        'Europe/Vienna': 'Austria - Central European Time',
        'America/Los_Angeles': 'USA - Pacific Time',
        'Europe/Paris': 'Central European Time',
        'Asia/Tokyo': 'Japan Standard Time',
        'Australia/Sydney': 'Australian Eastern Time'
    };

    return timezoneNames[timezone] || timezone;
}

/**
 * Render all member clock groups to the grid
 */
function renderMemberClocks() {
    const grid = document.getElementById('clocks-grid');
    grid.innerHTML = ''; // Clear existing cards

    const groupedMembers = groupMembersByTimezone();

    // For each timezone group, create a section
    groupedMembers.forEach((members, timezone) => {
        // Create timezone group container
        const groupSection = document.createElement('div');
        groupSection.className = 'timezone-group';
        groupSection.setAttribute('data-timezone', timezone);

        // Create timezone header
        const header = document.createElement('div');
        header.className = 'timezone-header';
        header.innerHTML = `
            <h2 class="timezone-title">${getTimezoneDisplayName(timezone)}</h2>
            <div class="timezone-members-count">${members.length} member${members.length !== 1 ? 's' : ''}</div>
        `;
        groupSection.appendChild(header);

        // Create members container for this timezone
        const membersContainer = document.createElement('div');
        membersContainer.className = 'timezone-members';

        // Add each member card
        members.forEach(member => {
            const card = createMemberCard(member);
            membersContainer.appendChild(card);
        });

        groupSection.appendChild(membersContainer);
        grid.appendChild(groupSection);
    });
}

/**
 * Update all member clock cards
 */
function updateAllMemberClocks() {
    const grid = document.getElementById('clocks-grid');
    const cards = grid.querySelectorAll('.member-clock-card');
    cards.forEach(card => updateMemberCard(card));
}

/* ========================================
   🖼️ HEADER CUSTOMIZATION
   ======================================== */

/**
 * Update header with custom logo and title
 */
function updateHeader() {
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.textContent = HEADER_CONFIG.icon;
    }

    const title = document.querySelector('.header h1');
    if (title) {
        title.textContent = HEADER_CONFIG.title;
    }

    const tagline = document.querySelector('.tagline');
    if (tagline) {
        tagline.textContent = HEADER_CONFIG.tagline;
    }
}

/* ========================================
   🔄 MAIN UPDATE LOOP
   ======================================== */

/**
 * Main initialization function
 */
function initializeClock() {
    console.log('%c⏰ OurCraft Studio Clock', 'font-size: 18px; font-weight: bold; color: #ff6b35;');
    console.log('%c✏️  To customize:', 'font-size: 12px; font-weight: bold;');
    console.log(`
1. ADD MEMBERS: Edit the GROUP_MEMBERS array in script.js
   Format: { name: 'Name', timezone: 'Timezone', minecraftUsername: 'username' }
   
   ✨ Members are AUTOMATICALLY GROUPED by timezone!
   Example:
   - Add 2 members with 'America/Denver' → they group together
   - Add 3 members with 'America/New_York' → they group together

2. CHANGE COLORS: Edit CSS variables in :root in style.css

3. CHANGE TITLE: Edit HEADER_CONFIG in script.js

4. MINECRAFT SKIN: Add minecraftUsername to each member
   - Uses free mc-heads.net API: https://mc-heads.net
   - Fetches player's skin head automatically

📍 Timezone Examples:
   America/Denver (Mountain Time - USA)
   America/Edmonton (Mountain Time - Canada)
   America/Calgary (Mountain Standard Time - Canada)
   America/Chicago (Central Time - USA)
   America/New_York (Eastern Time - USA)
   Europe/London (GMT - Wales)
   Europe/Vienna (Central European Time - Austria)
   America/Los_Angeles (Pacific Time - USA)
   Europe/Paris, Asia/Tokyo, Australia/Sydney, etc.

🎮 Minecraft Username:
   Enter the exact Minecraft username (case-sensitive)
   Example: 'hypixel', 'Notch', 'dream'

💡 Grouping Example:
   If you have:
   - Jay (America/Denver)
   - Sarah (America/Denver)
   - Mike (America/New_York)
   - Lisa (America/New_York)
   - Tom (America/New_York)
   
   They'll automatically group as:
   [USA - Mountain Time]
   - Jay
   - Sarah
   
   [USA - Eastern Time]
   - Mike
   - Lisa
   - Tom
      `, 'color: #e8e8e8;');

    // Update header
    updateHeader();

    // Render all member clocks (grouped by timezone)
    renderMemberClocks();

    // Update clocks every 100ms for smooth second hand animation
    setInterval(updateAllMemberClocks, 100);
}

/* ========================================
   📄 PAGE LIFECYCLE
   ======================================== */

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeClock);
} else {
    initializeClock();
}
