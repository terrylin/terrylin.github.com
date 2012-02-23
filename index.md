---
layout: page
title: Yes,Terrylin
---
{% include JB/setup %}
这是terrylin最新的博客,使用传说中的Jekyll(https://github.com/mojombo/jekyll)建立的,
不管如何,希望自己能够坚持写写.
{% for post in site.posts %}
{{ post.date | date_to_string }} » {{ post.title }}
{% endfor %}


