const newFormHandler = async (event) => {
	event.preventDefault();

	const title = document.querySelector('#blog-title').value.trim();

	const description = document.querySelector('#blog-desc').value.trim();

	if (title && description) {
		const response = await fetch(`/api/blogs`, {
			method: 'POST',
			body: JSON.stringify({ title, description }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to create blog');
		}
	}
};

// const delButtonHandler = async () => {
// 	// send delete request
// 		const response = await fetch(`/api/blogs/${id}`, {
// 			method: 'DELETE',
// 		});

// 		if (response.ok) {
// 			document.location.replace('/dashboard');
// 		} else {
// 			alert('Failed to delete blog');
// 		}
// 	}
// };

const deleteBlog = (id) =>
  fetch(`/api/blog/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

document
	.querySelector('.new-blog-form')
	.addEventListener('submit', newFormHandler);

document
	.querySelector('.blog-list')
	.addEventListener('click', deleteBlog);