window.addEventListener('load', function () {
    document.addEventListener('click', async function (event) {
        if (event.target.classList.contains('update-comment-link')) {
            event.preventDefault();

            const commentId = event.target.dataset.commentId;
            const commentTextElement = document.getElementById(`commentText-${commentId}`);

            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.value = commentTextElement.textContent;

            commentTextElement.replaceWith(inputField);

            const saveButton = document.createElement('button');
            saveButton.classList.add('update-comment-btn'); 
            saveButton.textContent = 'Update';
            saveButton.addEventListener('click', async function () {
                const updatedCommentText = inputField.value;

                try {
                    const response = await fetch(`/api/comment/${commentId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ commentPost: updatedCommentText }),
                    });

                    if (!response.ok) {
                        throw new Error('Comment update failed');
                    }

                    location.reload();
                    inputField.replaceWith(commentTextElement);
                    commentTextElement.textContent = updatedCommentText;
                } catch (error) {
                    console.error('Error updating comment:', error.message);
                }
            });

            inputField.insertAdjacentElement('afterend', saveButton);
        }
    });
});
