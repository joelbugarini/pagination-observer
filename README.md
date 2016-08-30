# Pagination Observer
Simple table pagination based in [MutationObserver API](https://developer.mozilla.org/en/docs/Web/API/MutationObserver).
Just add `class="pagination-observer"` to your table and then call the script. Optionally you can set the atributes  `data-current="1"` and `data-show="5"` to configure the initial page and the number of element to show.
```html
<table class="pagination-observer" data-current="1" data-show="5">
        <tr><td>1</td><td>Alexander Benton</td><td>viverra.Donec.tempus@ridicsAenean.ca</td><td>Apr 9, 2016</td></tr>
        <tr><td>2</td><td>Garrison Barrera</td><td>commodo.alibero@anteVivamusnon.com</td><td>Jan 12, 2017</td></tr>
        <tr><td>3</td><td>Cathleen Vaughan</td><td>Duinissim@nec.co.uk</td><td>Mar 23, 2016</td></tr>
        <tr><td>4</td><td>Angelica Booth</td><td>Nulla.semper.tellus@aptenttaciti.org</td><td>Oct 14, 2015</td></tr>
        <tr><td>5</td><td>Barbara Barber</td><td>amet.massa.Quisque@etcommodoat.com</td><td>Jul 1, 2017</td></tr>
</table>
```
This will render something like this:


![alt table](https://cloud.githubusercontent.com/assets/4912547/18040843/f99ff1fe-6d66-11e6-974b-84f5e7525a06.JPG "Table")


