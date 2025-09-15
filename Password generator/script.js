/**
 * Advanced Password Generator
 * A secure, customizable password generation tool with real-time strength analysis
 *
 * Features:
 * - Random password generation
 * - Real-time password strength analysis
 * - Customizable character sets
 * - Theme switching (dark/light)
 * - Clipboard integration
 * - Responsive design
 *
 * Author: Cansın İçgöz
 * Version: 1.0.0
 */

"use strict"

// ==========================================================================
// CONFIGURATION & CONSTANTS
// ==========================================================================

const CONFIG = {
  MIN_LENGTH: 4,
  MAX_LENGTH: 128,
  DEFAULT_LENGTH: 25,
  STRENGTH_THRESHOLDS: {
    WEAK: 4,
    MEDIUM: 9,
    STRONG: 10,
  },
}

const CHARACTER_SETS = {
  UPPERCASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  LOWERCASE: "abcdefghijklmnopqrstuvwxyz",
  NUMBERS: "0123456789",
  SYMBOLS: "!@#$%^&*()_+{}[]|;:,.<>?",
}

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================

const elements = {
  // Password display
  result: document.getElementById("result"),

  // Length controls
  length: document.getElementById("length"),
  lengthSlider: document.getElementById("lengthSlider"),
  sliderValue: document.getElementById("sliderValue"),
  decrease: document.getElementById("decrease"),
  increase: document.getElementById("increase"),

  // Character type checkboxes
  uppercase: document.getElementById("uppercase"),
  lowercase: document.getElementById("lowercase"),
  numbers: document.getElementById("numbers"),
  symbols: document.getElementById("symbols"),

  // Action buttons
  generate: document.getElementById("generate"),
  clipboard: document.getElementById("clipboard"),
  previewToggle: document.getElementById("previewToggle"),
  previewIcon: document.getElementById("previewIcon"),

  // Theme controls
  themeToggle: document.getElementById("themeToggle"),
  themeIcon: document.getElementById("themeIcon"),

  // Strength indicator
  strengthFill: document.getElementById("strengthFill"),
  strengthText: document.getElementById("strengthText"),
}

// ==========================================================================
// STATE MANAGEMENT
// ==========================================================================

let state = {
  isPasswordVisible: true,
  currentPassword: "",
  theme: localStorage.getItem("theme") || "dark",
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

/**
 * Random number generation using Math.random()
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} Random integer between 0 and max-1
 */
function secureRandom(max) {
  return Math.floor(Math.random() * max)
}

/**
 * Generate random character from specified character set
 * @param {string} charset - Character set to choose from
 * @returns {string} Random character
 */
function getRandomCharacter(charset) {
  return charset[secureRandom(charset.length)]
}

/**
 * Validate user inputs and return sanitized values
 * @returns {Object} Validated input values
 * @throws {Error} If validation fails
 */
function validateInputs() {
  const length = parseInt(elements.length.value)
  const hasLower = elements.lowercase.checked
  const hasUpper = elements.uppercase.checked
  const hasNumber = elements.numbers.checked
  const hasSymbol = elements.symbols.checked

  // Length validation
  if (
    isNaN(length) ||
    length < CONFIG.MIN_LENGTH ||
    length > CONFIG.MAX_LENGTH
  ) {
    throw new Error(
      `Password length must be between ${CONFIG.MIN_LENGTH}-${CONFIG.MAX_LENGTH} characters`
    )
  }

  // Character type validation
  if (!hasLower && !hasUpper && !hasNumber && !hasSymbol) {
    throw new Error("At least one character type must be selected")
  }

  return { length, hasLower, hasUpper, hasNumber, hasSymbol }
}

// ==========================================================================
// PASSWORD GENERATION
// ==========================================================================

/**
 * Generate a secure password based on user preferences
 * @returns {string} Generated password
 */
function generatePassword() {
  try {
    // Validate inputs
    const { length, hasLower, hasUpper, hasNumber, hasSymbol } =
      validateInputs()

    // Build character pool
    let characterPool = ""
    if (hasLower) characterPool += CHARACTER_SETS.LOWERCASE
    if (hasUpper) characterPool += CHARACTER_SETS.UPPERCASE
    if (hasNumber) characterPool += CHARACTER_SETS.NUMBERS
    if (hasSymbol) characterPool += CHARACTER_SETS.SYMBOLS

    // Generate password
    let password = ""
    for (let i = 0; i < length; i++) {
      password += getRandomCharacter(characterPool)
    }

    // Update state and display
    state.currentPassword = password
    elements.result.textContent = password

    // Reset visibility state
    state.isPasswordVisible = true
    elements.result.classList.remove("hidden")
    elements.previewIcon.className = "fas fa-eye"
    elements.previewToggle.title = "Hide password"

    // Update UI
    updatePasswordStrength(password)
    adjustContainerHeight()

    console.log(
      `Password generated: ${length} characters, strength: ${
        getPasswordStrength(password).strength
      }`
    )

    return password
  } catch (error) {
    console.error("Password generation error:", error.message)
    elements.result.textContent = "Error: " + error.message
    updatePasswordStrength("")
  }
}

// ==========================================================================
// PASSWORD STRENGTH ANALYSIS
// ==========================================================================

/**
 * Analyze password strength and return detailed metrics
 * @param {string} password - Password to analyze
 * @returns {Object} Strength analysis results
 */
function getPasswordStrength(password) {
  if (!password) {
    return { score: 0, strength: "None", strengthClass: "", checks: {} }
  }

  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[!@#$%^&*()_+{}[\]|;:,.<>?]/.test(password),
    noRepeats: !/(.)\1{2,}/.test(password),
    longLength: password.length >= 12,
    veryLongLength: password.length >= 16,
  }

  let score = Object.values(checks).filter(Boolean).length

  // Bonus points for length
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1

  let strength, strengthClass
  if (score <= CONFIG.STRENGTH_THRESHOLDS.WEAK) {
    strength = "Weak"
    strengthClass = "weak"
  } else if (score <= CONFIG.STRENGTH_THRESHOLDS.MEDIUM) {
    strength = "Medium"
    strengthClass = "medium"
  } else {
    strength = "Strong"
    strengthClass = "strong"
  }

  return { score, strength, strengthClass, checks }
}

/**
 * Update password strength indicator in UI
 * @param {string} password - Password to analyze
 */
function updatePasswordStrength(password) {
  const strength = getPasswordStrength(password)

  // Reset classes
  elements.strengthFill.className = "strength-fill"

  if (password) {
    // Add appropriate strength class
    if (strength.score <= CONFIG.STRENGTH_THRESHOLDS.WEAK) {
      elements.strengthFill.classList.add("weak")
      elements.strengthText.textContent = "Weak Password"
    } else if (strength.score <= CONFIG.STRENGTH_THRESHOLDS.MEDIUM) {
      elements.strengthFill.classList.add("medium")
      elements.strengthText.textContent = "Medium Password"
    } else {
      elements.strengthFill.classList.add("strong")
      elements.strengthText.textContent = "Strong Password"
    }
  } else {
    elements.strengthText.textContent = "Generate a password"
  }
}

// ==========================================================================
// CLIPBOARD FUNCTIONALITY
// ==========================================================================

/**
 * Copy password to clipboard with security validation
 */
async function copyToClipboard() {
  try {
    const password = elements.result.textContent

    // Validate password
    if (!password || password.startsWith("Error:")) {
      throw new Error("Please generate a valid password first!")
    }

    // Security check - only allow safe characters
    if (!/^[a-zA-Z0-9!@#$%^&*()_+{}[\]|;:,.<>?]+$/.test(password)) {
      throw new Error("Security error: Invalid characters detected")
    }

    // Use clipboard API if available
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(password)
      showCopySuccess()
    } else {
      // Fallback method
      fallbackCopy(password)
    }
  } catch (error) {
    console.error("Copy error:", error.message)
    elements.result.textContent = "Error: " + error.message
  }
}

/**
 * Fallback copy method for older browsers
 * @param {string} text - Text to copy
 */
function fallbackCopy(text) {
  const textArea = document.createElement("textarea")
  textArea.value = text
  textArea.style.position = "fixed"
  textArea.style.left = "-999999px"
  textArea.style.top = "-999999px"
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand("copy")
    showCopySuccess()
  } catch (err) {
    console.error("Fallback copy error:", err)
    alert("Copy failed! Please copy manually.")
  } finally {
    document.body.removeChild(textArea)
  }
}

/**
 * Show visual feedback for successful copy operation
 */
function showCopySuccess() {
  const originalIcon = elements.clipboard.innerHTML
  elements.clipboard.innerHTML = '<i class="fas fa-check"></i>'
  elements.clipboard.style.background = "#28a745"

  setTimeout(() => {
    elements.clipboard.innerHTML = originalIcon
    elements.clipboard.style.background = ""
  }, 2000)
}

// ==========================================================================
// PASSWORD VISIBILITY TOGGLE
// ==========================================================================

/**
 * Toggle password visibility
 */
function togglePasswordVisibility() {
  state.isPasswordVisible = !state.isPasswordVisible

  if (state.isPasswordVisible) {
    elements.result.classList.remove("hidden")
    elements.previewIcon.className = "fas fa-eye"
    elements.previewToggle.title = "Hide password"
  } else {
    elements.result.classList.add("hidden")
    elements.previewIcon.className = "fas fa-eye-slash"
    elements.previewToggle.title = "Show password"
  }
}

// ==========================================================================
// THEME MANAGEMENT
// ==========================================================================

/**
 * Toggle between dark and light themes
 */
function toggleTheme() {
  const body = document.body
  body.classList.toggle("light-theme")

  if (body.classList.contains("light-theme")) {
    elements.themeIcon.className = "fas fa-sun"
    state.theme = "light"
    localStorage.setItem("theme", "light")
  } else {
    elements.themeIcon.className = "fas fa-moon"
    state.theme = "dark"
    localStorage.setItem("theme", "dark")
  }
}

/**
 * Initialize theme from localStorage
 */
function initializeTheme() {
  const body = document.body
  body.classList.toggle("light-theme", state.theme === "light")
  elements.themeIcon.className =
    state.theme === "light" ? "fas fa-sun" : "fas fa-moon"
}

// ==========================================================================
// LENGTH CONTROLS
// ==========================================================================

/**
 * Update length controls to keep them in sync
 * @param {number} value - New length value
 */
function updateLengthControls(value) {
  elements.length.value = value
  elements.lengthSlider.value = value
  elements.sliderValue.textContent = value
  updatePasswordStrength(state.currentPassword)
}

/**
 * Decrease password length
 */
function decreaseLength() {
  const currentValue = parseInt(elements.length.value)
  if (currentValue > CONFIG.MIN_LENGTH) {
    updateLengthControls(currentValue - 1)
  }
}

/**
 * Increase password length
 */
function increaseLength() {
  const currentValue = parseInt(elements.length.value)
  if (currentValue < CONFIG.MAX_LENGTH) {
    updateLengthControls(currentValue + 1)
  }
}

// ==========================================================================
// UI ADJUSTMENTS
// ==========================================================================

/**
 * Adjust container height based on content
 */
function adjustContainerHeight() {
  const resultContainer = document.querySelector(".result-container")
  const passwordDisplay = elements.result

  if (passwordDisplay && resultContainer) {
    // Keep container fixed height
    resultContainer.style.height = "80px"
    resultContainer.style.alignItems = "center"
    resultContainer.style.padding = "20px"
    resultContainer.style.overflow = "hidden"

    // Adjust text display
    passwordDisplay.style.fontSize = "14px"
    passwordDisplay.style.lineHeight = "1.2"
    passwordDisplay.style.maxHeight = "40px"
    passwordDisplay.style.overflow = "hidden"
    passwordDisplay.style.textOverflow = "ellipsis"
  }
}

// ==========================================================================
// SETTINGS INTERACTION
// ==========================================================================

/**
 * Toggle checkbox when setting div is clicked
 * @param {string} checkboxId - ID of checkbox to toggle
 */
function toggleCheckbox(checkboxId) {
  const checkbox = document.getElementById(checkboxId)
  if (checkbox) {
    checkbox.checked = !checkbox.checked
    updatePasswordStrength(state.currentPassword)
  }
}

/**
 * Initialize settings click handlers
 */
function initializeSettingsHandlers() {
  document.querySelectorAll(".setting").forEach((setting) => {
    setting.addEventListener("click", (e) => {
      // Don't trigger if clicking on input directly
      if (e.target.type === "checkbox" || e.target.type === "number") {
        return
      }

      // Find the checkbox in this setting
      const checkbox = setting.querySelector('input[type="checkbox"]')
      if (checkbox) {
        toggleCheckbox(checkbox.id)
      }
    })
  })
}

// ==========================================================================
// EVENT LISTENERS
// ==========================================================================

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
  // Password generation
  elements.generate.addEventListener("click", generatePassword)

  // Clipboard functionality
  elements.clipboard.addEventListener("click", copyToClipboard)

  // Password visibility toggle
  elements.previewToggle.addEventListener("click", togglePasswordVisibility)

  // Theme toggle
  elements.themeToggle.addEventListener("click", toggleTheme)

  // Length controls
  elements.lengthSlider.addEventListener("input", () => {
    updateLengthControls(parseInt(elements.lengthSlider.value))
  })

  elements.length.addEventListener("input", () => {
    updateLengthControls(parseInt(elements.length.value))
  })

  elements.decrease.addEventListener("click", decreaseLength)
  elements.increase.addEventListener("click", increaseLength)

  // Character type checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updatePasswordStrength(state.currentPassword)
    })
  })

  // Settings click handlers
  initializeSettingsHandlers()
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================

/**
 * Initialize the application
 */
function initializeApp() {
  console.log("Initializing Advanced Password Generator...")

  // Initialize theme
  initializeTheme()

  // Initialize event listeners
  initializeEventListeners()

  // Set initial values
  updateLengthControls(CONFIG.DEFAULT_LENGTH)

  console.log("Application initialized successfully")
}

// ==========================================================================
// APPLICATION START
// ==========================================================================

// Start the application when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp)
} else {
  initializeApp()
}

// Export for testing purposes (if in module environment)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    generatePassword,
    getPasswordStrength,
    validateInputs,
    secureRandom,
  }
}
