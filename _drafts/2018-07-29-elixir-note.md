---
layout: post
title:  "Elixir note"
date:   2018-7-29 00:11:33 +0700
bigimg: /img/chrome-min.jpg
share-img: /img/chrome-min.jpg
tags: [programming]
---

### Phoenix tree request
Incoming request ->
Ensure its an HTML request ->
See if it has a session ->
Do a security check ->
Put on HTTP headers for a browser ->
See what the request was trying to access ->
Formulate and return a request

### Phoenix socket

One socket have multiple channel.
Channel have 2 method: 
  - `join`: listen the data comming over websocket channel. It call when user join a channel
  - `handle_in`: Recieve event comming from user client.


### Tip
1. How to test a function
```bash
iex -S mix
```
2. Reload iex
```bash
recompile
```
3. Debug on Phoenix
Start phoenix server by
```bash
iex -S mix phx.server
```
Put debugger inside source code
```elixir
require IEx

IEx.pry
```