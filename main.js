// wallpaper engine properties
// wallpaper engine 参数
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
        // background color
        // 背景颜色
        if (properties.schemecolor) {
            var customColor = properties.schemecolor.value.split(' ');
            customColor = customColor.map(function (c) {
                return Math.ceil(c * 255);
            });
            document.body.style.backgroundColor = `rgb(${customColor})`;
        }
        // background image
        // 背景图片
        if (properties.backgroundimage) {
            var customImageFile = properties.backgroundimage.value;
            document.body.style.backgroundImage = `url(file:///${customImageFile})`;
        }
    }
}

window.onload = () => {
    // init window
    // 初始化窗口
    let width = window.innerWidth * 0.244; //625 in 2k
    let height = window.innerWidth * 0.318; // 815 in 2k
    let frame = document.getElementById("frame");
    frame.style.width = `${width}px`;
    frame.style.height = `${height}px`;
    frame.querySelector('.navbar').style.height = `${window.innerHeight * 0.039}px`;
    let position = localStorage.getItem('position');
    if (localStorage.getItem('position')) {
        position = JSON.parse(position);
        setPosition(frame, position.x, position.y);
    } else {
        setPosition(frame, (window.innerWidth / 2) - (width / 2), (window.innerHeight / 2) - (height / 2));
    }
    dragElement(frame);
};

function setPosition(element, x, y) {
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
}

// codes below are copied from https://www.w3schools.com/howto/howto_js_draggable.asp
// 以下代码取自 https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.querySelector(".navbar").addEventListener('mousedown', dragMouseDown)

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        localStorage.setItem('position', JSON.stringify({ x: element.offsetLeft - pos1, y: element.offsetTop - pos2 }));
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}