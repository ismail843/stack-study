document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Code editor tabs functionality
    const editorTabs = document.querySelectorAll('.editor-tabs button');
    const editorTextareas = document.querySelectorAll('.editor-content textarea');
    
    editorTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active tab
            editorTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active textarea
            editorTextareas.forEach(textarea => {
                textarea.classList.remove('active');
                if (textarea.id === `${tabName}-editor`) {
                    textarea.classList.add('active');
                    
                    // Focus the active textarea
                    textarea.focus();
                }
            });
        });
    });
    
    // Run code button functionality
    const runButton = document.getElementById('run-code');
    const outputFrame = document.getElementById('output-frame');
    
    runButton.addEventListener('click', function() {
        const htmlCode = document.getElementById('html-editor').value;
        const cssCode = document.getElementById('css-editor').value;
        const jsCode = document.getElementById('js-editor').value;
        
        // Create a complete HTML document with the user's code
        const fullCode = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}</script>
            </body>
            </html>
        `;
        
        // Write the code to the iframe
        outputFrame.srcdoc = fullCode;
        
        // Provide visual feedback
        this.innerHTML = 'Code Executed <i class="fas fa-check"></i>';
        setTimeout(() => {
            this.innerHTML = 'Run Code <i class="fas fa-play"></i>';
        }, 2000);
    });
    
    // Initialize the first editor tab as active
    if (editorTextareas.length > 0) {
        editorTextareas[0].classList.add('active');
    }
    
    // Add syntax highlighting to code examples (would need a library like Prism.js for full implementation)
    document.querySelectorAll('pre code').forEach((block) => {
        // This is where you would add syntax highlighting
        // For now, we'll just add a class
        block.classList.add('language-html');
    });
    
    // Make code examples copyable
    document.querySelectorAll('.code-example').forEach(example => {
        const codeBlock = example.querySelector('code');
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="far fa-copy"></i>';
        copyButton.title = 'Copy to clipboard';
        
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent)
                .then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="far fa-copy"></i>';
                    copyButton.blur();
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
        
        example.style.position = 'relative';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '10px';
        copyButton.style.right = '10px';
        copyButton.style.background = 'transparent';
        copyButton.style.border = 'none';
        copyButton.style.color = 'var(--primary-color)';
        copyButton.style.cursor = 'pointer';
        copyButton.style.fontSize = '1rem';
        
        example.appendChild(copyButton);
    });
});