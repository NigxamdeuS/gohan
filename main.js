const ham = document.querySelector('#js-hamburger');
const nav = document.querySelector('#js-nav');

ham.addEventListener('click', function () {

  ham.classList.toggle('active');
  nav.classList.toggle('active');

});

// モーダルウィンドウの要素を取得
var modal = document.getElementById('modal');
var modalDescription = document.getElementById('modal-description');
var span = document.getElementsByClassName('close')[0];

// すべての画像リンクにイベントリスナーを追加
document.querySelectorAll('.img-link').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        var description = this.getAttribute('data-description');
        description = description.replace(/\n/g, '<br>');  // 改行を <br> に置き換える
        modalDescription.innerHTML = description;
        modal.style.display = 'block';
    });
});

// モーダルの閉じるボタン
span.onclick = function () {
    modal.style.display = 'none';
}

// モーダルの外側をクリックしたときに閉じる
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

