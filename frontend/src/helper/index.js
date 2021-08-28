export const uploadfile = (file1) => {
    const formData = new FormData();

	formData.append('file', file1);

    return fetch('http://127.0.0.1:5000/upload', {
        method: "POST",
        body: formData,
    })
    .then(res => {
        return res.json();
    })
    .then(data => console.log(data))
}
// to push new
