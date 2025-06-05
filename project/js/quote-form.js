document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const quoteForm = document.getElementById('quoteForm');
  const formSteps = document.querySelectorAll('.form-step');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const nextButtons = document.querySelectorAll('.btn-next');
  const progressBar = document.getElementById('progressBar');
  const progressSteps = document.querySelectorAll('.step');
  const whatsappBtn = document.getElementById('whatsappBtn');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const successOverlay = document.getElementById('successOverlay');
  
  // Check insurance type from URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const insuranceType = urlParams.get('type') || 'auto';
  
  // Update title and form fields based on insurance type
  updateInsuranceTypeFields(insuranceType);
  
  // Initialize form masks and validations
  initializeFormMasks();
  
  // Form navigation (next/prev)
  if (prevButtons.length && nextButtons.length) {
    // Previous button clicks
    prevButtons.forEach(button => {
      button.addEventListener('click', function() {
        const prevStep = this.getAttribute('data-prev');
        if (prevStep) {
          goToStep(parseInt(prevStep));
        }
      });
    });
    
    // Next button clicks
    nextButtons.forEach(button => {
      button.addEventListener('click', function() {
        const currentStep = this.closest('.form-step').id.replace('step', '');
        const nextStep = this.getAttribute('data-next');
        
        if (validateStep(currentStep) && nextStep) {
          // If going to the final step (quote), simulate loading
          if (nextStep === '4') {
            showLoadingOverlay();
            setTimeout(() => {
              hideLoadingOverlay();
              goToStep(parseInt(nextStep));
              
              // Generate random prices
              generateRandomPrices();
            }, 2000);
          } else {
            goToStep(parseInt(nextStep));
          }
        }
      });
    });
  }
  
  // Conditional fields visibility
  setupConditionalFields();
  
  // WhatsApp button click
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
      // Get form data
      const formData = new FormData(quoteForm);
      const name = formData.get('name') || 'Cliente';
      
      // Show success overlay
      successOverlay.style.display = 'flex';
      
      // Prepare WhatsApp message
      const message = `Olá, sou ${name} e tenho interesse em uma cotação de seguro ${getInsuranceTypeText(insuranceType)}.`;
      const encodedMessage = encodeURIComponent(message);
      
      // Wait 2 seconds then redirect to WhatsApp
      setTimeout(() => {
        window.location.href = `https://wa.me/5511987654321?text=${encodedMessage}`;
      }, 2000);
    });
  }
  
  // Functions
  
  // Go to specific step
  function goToStep(stepNumber) {
    // Hide all steps
    formSteps.forEach(step => {
      step.classList.remove('active');
    });
    
    // Show target step
    const targetStep = document.getElementById(`step${stepNumber}`);
    if (targetStep) {
      targetStep.classList.add('active');
    }
    
    // Update progress bar
    if (progressBar) {
      progressBar.style.width = `${stepNumber * 25}%`;
    }
    
    // Update step indicators
    if (progressSteps.length) {
      progressSteps.forEach((step, index) => {
        if (index + 1 < stepNumber) {
          step.classList.add('completed');
          step.classList.remove('active');
        } else if (index + 1 === stepNumber) {
          step.classList.add('active');
          step.classList.remove('completed');
        } else {
          step.classList.remove('active', 'completed');
        }
      });
    }
    
    // Scroll to top of form
    window.scrollTo({
      top: quoteForm.offsetTop - 100,
      behavior: 'smooth'
    });
  }
  
  // Validate current step
  function validateStep(stepNumber) {
    const currentStep = document.getElementById(`step${stepNumber}`);
    
    if (!currentStep) return true;
    
    let isValid = true;
    const requiredFields = currentStep.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value) {
        isValid = false;
        field.classList.add('error');
        
        // Add error styles
        field.style.borderColor = 'var(--error)';
        
        // Remove error styles on input
        field.addEventListener('input', function() {
          this.style.borderColor = '';
          this.classList.remove('error');
        }, { once: true });
      }
    });
    
    // Check radio button groups
    const radioGroups = currentStep.querySelectorAll('.radio-group');
    radioGroups.forEach(group => {
      const groupName = group.querySelector('input[type="radio"]')?.name;
      if (groupName && isRadioRequired(groupName)) {
        const checkedRadio = currentStep.querySelector(`input[name="${groupName}"]:checked`);
        if (!checkedRadio) {
          isValid = false;
          
          // Highlight radio group
          group.style.padding = '8px';
          group.style.border = '1px solid var(--error)';
          group.style.borderRadius = 'var(--radius-md)';
          
          // Remove highlight on selection
          const radios = group.querySelectorAll('input[type="radio"]');
          radios.forEach(radio => {
            radio.addEventListener('change', function() {
              group.style.padding = '';
              group.style.border = '';
            }, { once: true });
          });
        }
      }
    });
    
    return isValid;
  }
  
  // Setup conditional fields visibility
  function setupConditionalFields() {
    // Young driver details
    const youngDriverRadios = document.querySelectorAll('input[name="youngDriver"]');
    const youngDriverDetails = document.getElementById('youngDriverDetails');
    
    if (youngDriverRadios.length && youngDriverDetails) {
      youngDriverRadios.forEach(radio => {
        radio.addEventListener('change', function() {
          youngDriverDetails.style.display = this.value === 'sim' ? 'block' : 'none';
          
          // Set/remove required attribute for fields
          const fields = youngDriverDetails.querySelectorAll('input, select');
          fields.forEach(field => {
            if (this.value === 'sim') {
              field.setAttribute('required', '');
            } else {
              field.removeAttribute('required');
            }
          });
        });
      });
    }
    
    // Insurance details - Auto
    const hasInsuranceRadios = document.querySelectorAll('input[name="hasInsurance"]');
    const insuranceDetails = document.getElementById('insuranceDetails');
    
    if (hasInsuranceRadios.length && insuranceDetails) {
      hasInsuranceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
          insuranceDetails.style.display = this.value === 'sim' ? 'block' : 'none';
          
          // Set/remove required attribute for fields
          const fields = insuranceDetails.querySelectorAll('input, select');
          fields.forEach(field => {
            if (this.value === 'sim') {
              field.setAttribute('required', '');
            } else {
              field.removeAttribute('required');
            }
          });
        });
      });
    }
    
    // Home insurance details
    const hasHomeInsuranceRadios = document.querySelectorAll('input[name="hasHomeInsurance"]');
    const homeInsuranceDetails = document.getElementById('homeInsuranceDetails');
    
    if (hasHomeInsuranceRadios.length && homeInsuranceDetails) {
      hasHomeInsuranceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
          homeInsuranceDetails.style.display = this.value === 'sim' ? 'block' : 'none';
          
          // Set/remove required attribute for fields
          const fields = homeInsuranceDetails.querySelectorAll('input, select');
          fields.forEach(field => {
            if (this.value === 'sim') {
              field.setAttribute('required', '');
            } else {
              field.removeAttribute('required');
            }
          });
        });
      });
    }
    
    // Business insurance details
    const hasBusinessInsuranceRadios = document.querySelectorAll('input[name="hasBusinessInsurance"]');
    const businessInsuranceDetails = document.getElementById('businessInsuranceDetails');
    
    if (hasBusinessInsuranceRadios.length && businessInsuranceDetails) {
      hasBusinessInsuranceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
          businessInsuranceDetails.style.display = this.value === 'sim' ? 'block' : 'none';
          
          // Set/remove required attribute for fields
          const fields = businessInsuranceDetails.querySelectorAll('input, select');
          fields.forEach(field => {
            if (this.value === 'sim') {
              field.setAttribute('required', '');
            } else {
              field.removeAttribute('required');
            }
          });
        });
      });
    }
  }
  
  // Update insurance type fields
  function updateInsuranceTypeFields(type) {
    const insuranceTypeTitle = document.getElementById('insuranceTypeTitle');
    const assetTypeLabel = document.getElementById('assetTypeLabel');
    const autoFields = document.getElementById('autoFields');
    const homeFields = document.getElementById('homeFields');
    const businessFields = document.getElementById('businessFields');
    const autoQuestions = document.getElementById('autoQuestions');
    const homeQuestions = document.getElementById('homeQuestions');
    const businessQuestions = document.getElementById('businessQuestions');
    const driverLicenseGroup = document.getElementById('driverLicenseGroup');
    
    if (insuranceTypeTitle) {
      insuranceTypeTitle.textContent = getInsuranceTypeText(type);
    }
    
    // Update asset type label
    if (assetTypeLabel) {
      switch (type) {
        case 'home':
          assetTypeLabel.textContent = 'Imóvel';
          break;
        case 'business':
          assetTypeLabel.textContent = 'Empresa';
          break;
        default:
          assetTypeLabel.textContent = 'Veículo';
      }
    }
    
    // Show/hide fields based on type
    if (autoFields && homeFields && businessFields) {
      autoFields.style.display = type === 'auto' ? 'block' : 'none';
      homeFields.style.display = type === 'home' ? 'block' : 'none';
      businessFields.style.display = type === 'business' ? 'block' : 'none';
    }
    
    // Show/hide questions based on type
    if (autoQuestions && homeQuestions && businessQuestions) {
      autoQuestions.style.display = type === 'auto' ? 'block' : 'none';
      homeQuestions.style.display = type === 'home' ? 'block' : 'none';
      businessQuestions.style.display = type === 'business' ? 'block' : 'none';
    }
    
    // Handle driver license field requirement
    if (driverLicenseGroup) {
      const driverLicenseInput = driverLicenseGroup.querySelector('input');
      if (driverLicenseInput) {
        if (type === 'auto') {
          driverLicenseInput.setAttribute('required', '');
          driverLicenseGroup.style.display = 'flex';
        } else {
          driverLicenseInput.removeAttribute('required');
          driverLicenseGroup.style.display = 'none';
        }
      }
    }
  }
  
  // Get insurance type text
  function getInsuranceTypeText(type) {
    switch (type) {
      case 'home':
        return 'Residencial';
      case 'business':
        return 'Empresarial';
      default:
        return 'Automóvel';
    }
  }
  
  // Initialize form masks
  function initializeFormMasks() {
    // CPF mask
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
      cpfInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 9) {
          this.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
          this.value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
        } else if (value.length > 3) {
          this.value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
        } else {
          this.value = value;
        }
      });
    }
    
    // Phone mask
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 10) {
          this.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
          this.value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
        } else if (value.length > 2) {
          this.value = value.replace(/(\d{2})(\d+)/, '($1) $2');
        } else {
          this.value = value;
        }
      });
    }
    
    // CNPJ mask
    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) {
      cnpjInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 14) value = value.slice(0, 14);
        
        if (value.length > 12) {
          this.value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        } else if (value.length > 8) {
          this.value = value.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
        } else if (value.length > 5) {
          this.value = value.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
        } else if (value.length > 2) {
          this.value = value.replace(/(\d{2})(\d+)/, '$1.$2');
        } else {
          this.value = value;
        }
      });
    }
    
    // License plate mask
    const plateInput = document.getElementById('plate');
    if (plateInput) {
      plateInput.addEventListener('input', function() {
        let value = this.value.toUpperCase();
        if (value.length > 7) value = value.slice(0, 7);
        
        // Brazilian plate format: AAA0A00 or AAA-0000
        if (value.length > 3 && value.charAt(3) !== '-') {
          const isNewFormat = /[A-Z0-9]{7}/.test(value);
          if (isNewFormat) {
            this.value = value.replace(/([A-Z]{3})([0-9A-Z])([0-9]{2})/, '$1$2$3');
          } else {
            this.value = value.replace(/([A-Z]{3})(\d{4})/, '$1-$2');
          }
        } else {
          this.value = value;
        }
      });
    }
    
    // Money mask for annual revenue
    const revenueInput = document.getElementById('annualRevenue');
    if (revenueInput) {
      revenueInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        // Format as currency
        value = (parseInt(value) / 100).toFixed(2);
        value = value.replace('.', ',');
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        
        this.value = `R$ ${value}`;
      });
      
      // Set initial value
      revenueInput.value = 'R$ 0,00';
      
      // Handle focus
      revenueInput.addEventListener('focus', function() {
        if (this.value === 'R$ 0,00') {
          this.value = '';
        }
      });
      
      // Handle blur
      revenueInput.addEventListener('blur', function() {
        if (this.value === '' || this.value === 'R$ ') {
          this.value = 'R$ 0,00';
        }
      });
    }
  }
  
  // Check if a radio group is required
  function isRadioRequired(groupName) {
    // List of radio groups that are required
    const requiredGroups = [
      'hasCoverage', 'travels', 'transportGoods', 'youngDriver', 
      'uberDriver', 'hasInsurance', 'hasAlarm', 'isGatedCommunity', 
      'hadClaim', 'hasHomeInsurance', 'hasBusinessAlarm', 
      'hasFireSystem', 'hadBusinessClaim', 'hasBusinessInsurance'
    ];
    
    return requiredGroups.includes(groupName);
  }
  
  // Show loading overlay
  function showLoadingOverlay() {
    if (loadingOverlay) {
      loadingOverlay.style.display = 'flex';
    }
  }
  
  // Hide loading overlay
  function hideLoadingOverlay() {
    if (loadingOverlay) {
      loadingOverlay.style.display = 'none';
    }
  }
  
  // Generate random prices
  function generateRandomPrices() {
    const premiumPrice = document.getElementById('premiumPrice');
    const basicPrice = document.getElementById('basicPrice');
    
    if (premiumPrice && basicPrice) {
      // Get insurance type from URL
      const insuranceType = new URLSearchParams(window.location.search).get('type') || 'auto';
      
      // Base prices for different insurance types
      let basePremium = 0;
      let baseBasic = 0;
      
      switch (insuranceType) {
        case 'home':
          basePremium = 899.9;
          baseBasic = 599.9;
          break;
        case 'business':
          basePremium = 2499.9;
          baseBasic = 1799.9;
          break;
        default: // auto
          basePremium = 1249.9;
          baseBasic = 899.9;
      }
      
      // Add randomness (±10%)
      const randomFactor = 0.9 + (Math.random() * 0.2);
      const finalPremium = (basePremium * randomFactor).toFixed(2);
      const finalBasic = (baseBasic * randomFactor).toFixed(2);
      
      // Format as currency
      premiumPrice.textContent = `R$ ${finalPremium.replace('.', ',')}`;
      basicPrice.textContent = `R$ ${finalBasic.replace('.', ',')}`;
    }
  }
});