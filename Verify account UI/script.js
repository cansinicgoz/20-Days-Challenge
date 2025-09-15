const codes = document.querySelectorAll('.code');

codes[0].focus();

codes.forEach((code, idx) => {
    code.addEventListener('keydown', (e) => {
        if(e.key >= '0' && e.key <= '9') {
            e.preventDefault();
            codes[idx].value = e.key;
            setTimeout(() => codes[idx + 1].focus(), 10); 
        } else if (e.key === 'Backspace') {
            if (idx > 0) {
                setTimeout(() => codes[idx - 1].focus(), 10); 
            } else {
                // İlk input'ta backspace'e basılı tutunca tüm input'ları temizle
                codes.forEach(code => {
                    code.value = '';
                });
                codes[0].focus();
            }
        }
        if(idx === codes.length - 1) {
            
        }
    });
});