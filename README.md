# Pagination Observer
Simple table pagination based in [MutationObserver API](https://developer.mozilla.org/en/docs/Web/API/MutationObserver).
Just add `class="pagination-observer"` to your table and then call the script. Optionally you can set the atributes  `data-current="1"` and `data-show="5"` to configure the initial page and the number of element to show.
```html
<table class="pagination-observer" data-current="1" data-show="5">
        <tr><th>Jon</th><th>Pikes</th><th>35</th></tr>
        <tr><th>Jane</th><th>Lane</th><th>25</th></tr>
        <tr><th>Smith</th><th>Swanson</th><th>12</th></tr>
        ...
        ...
        ...
        <tr><th>Gina</th><th>Jefferies</th><th>48</th></tr>
</table>
```
This will render something like this:
![alt table](https://cloud.githubusercontent.com/assets/4912547/18040843/f99ff1fe-6d66-11e6-974b-84f5e7525a06.JPG "Table")


