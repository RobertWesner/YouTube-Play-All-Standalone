const navigateTo = url => {
    if (!url) return;

    const a = document.createElement('a');
    a.href = url;

    document.querySelector('ext-popup').appendChild(a);
    a.click();
    a.remove();
};

export default navigateTo;
