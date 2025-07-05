document.addEventListener("DOMContentLoaded", function() {
const scroller = scrollama();

        // Set up the scrollama instance
        scroller
            .setup({
                step: '.text-step',
                offset: 0.5,
                debug: false
            })
            .onStepEnter(response => {
                // Remove active class from all steps
                document.querySelectorAll('.text-step').forEach(step => {
                    step.classList.remove('active');
                });
                
                // Add active class to current step
                response.element.classList.add('active');
                
                // Change the sticky image and caption
                const imageUrl = response.element.getAttribute('data-image');
                const caption = response.element.getAttribute('data-caption');
                const stickyImage = document.getElementById('sticky-image');
                const imageContainer = document.getElementById('sticky-image-container');
                const imageCaption = document.getElementById('image-caption');
                
                if (imageUrl) {
                    // Add fade effect
                    stickyImage.classList.add('image-fade');
                    
                    // Change image and caption after fade starts
                    setTimeout(() => {
                        stickyImage.src = imageUrl;
                        if (caption) {
                            imageCaption.textContent = caption;
                        }
                        stickyImage.classList.remove('image-fade');
                        imageContainer.classList.add('image-highlight');
                        
                        // Remove highlight after animation
                        setTimeout(() => {
                            imageContainer.classList.remove('image-highlight');
                        }, 500);
                    }, 200);
                }
            })
            .onStepExit(response => {
                // Remove active class when step exits
                response.element.classList.remove('active');
            });

        // Handle window resize
        window.addEventListener('resize', scroller.resize);



        // const scroller = scrollama();

        // // Set up the scrollama instance
        // scroller
        //     .setup({
        //         step: '.text-step',
        //         offset: 0.5,
        //         debug: false
        //     })
        //     .onStepEnter(response => {
        //         // Remove active class from all steps
        //         document.querySelectorAll('.text-step').forEach(step => {
        //             step.classList.remove('active');
        //         });
                
        //         // Add active class to current step
        //         response.element.classList.add('active');
                
        //         // Change the sticky image
        //         const imageUrl = response.element.getAttribute('data-image');
        //         const stickyImage = document.getElementById('sticky-image');
        //         const imageContainer = document.getElementById('sticky-image-container');
                
        //         if (imageUrl) {
        //             // Add fade effect
        //             stickyImage.classList.add('image-fade');
                    
        //             // Change image after fade starts
        //             setTimeout(() => {
        //                 stickyImage.src = imageUrl;
        //                 stickyImage.classList.remove('image-fade');
        //                 imageContainer.classList.add('image-highlight');
                        
        //                 // Remove highlight after animation
        //                 setTimeout(() => {
        //                     imageContainer.classList.remove('image-highlight');
        //                 }, 500);
        //             }, 200);
        //         }
        //     })
        //     .onStepExit(response => {
        //         // Remove active class when step exits
        //         response.element.classList.remove('active');
        //     });

        // // Handle window resize
        // window.addEventListener('resize', scroller.resize);
});