(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{68:function(e,n,t){"use strict";t.r(n);var s=t(0),c=t(1),r=t.n(c),i=t(34),l=t.n(i),a=t(3),o=t(2),j=function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("nav",{children:Object(s.jsx)(a.b,{to:"/setlists",children:"Setlists"})}),Object(s.jsx)("h1",{children:"Hey what's up we're Mr. Please"})]})},u=t(10),h=t(23),d=t.n(h),b=t(40),x=t(36),O=t(16),g=t(9),f=function(e){var n=e.songs,t=e.Heading;return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(t,{children:Object(s.jsx)("h1",{children:"Songs played by Mr. Please: "})}),n?Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("ul",{children:n.map((function(e){return Object(s.jsx)("li",{children:Object(s.jsx)(a.b,{to:"/setlists/songs/".concat(e.URLname),children:e.title})},e.id)}))})}):null]})};function p(){var e=Object(u.a)(["\n    margin-top: 0;\n  "]);return p=function(){return e},e}function m(){var e=Object(u.a)(["\n    background: papayawhip;\n    box-shadow: 0 7px 30px -10px rgba(150,170,180,0.5);\n    border-radius: 20px;\n    padding: 10px;\n    width: 90%;\n    margin-bottom: 40px;\n\n    @media (min-width: 400px) {\n      max-width: 60%;\n    }\n\n    a {\n      color: palevioletred;\n      text-decoration: none;\n      &:hover {\n        text-decoration: underline;\n      }\n    }\n    \n    span {\n      color: palevioletred;\n    }\n  "]);return m=function(){return e},e}var v=function(e){var n=e.show,t=g.a.div(m()),c=g.a.h3(p()),r=n.date,i=r.month,l=r.day,o=r.year,j="".concat(i,"/").concat(l,"/").concat(o),u=n.venue.name,h=n.sets[1],d=n.sets[2],b=n.sets[3],x=n.sets.encore,O=n.showNotes,f=function(){var e=[];for(var t in n.sets){var s=n.sets[t].filter((function(e){return e.note})).map((function(e){return e.note}));e=e.concat(s)}return e}();return Object(s.jsxs)(t,{children:[Object(s.jsxs)(c,{children:[j," - ",u]}),h.length>0?Object(s.jsxs)("p",{children:["Set One: ",h.map((function(e,n){return Object(s.jsxs)("span",{children:[Object(s.jsx)(a.b,{to:"/setlists/songs/".concat(e.URLname),children:e.title},e.title),e.note?Object(s.jsxs)("sup",{children:["[",e.note.id,"]"]}):null,n===h.length-1?null:e.transition?" > ":", "]},e.title)}))]}):null,d.length>0?Object(s.jsxs)("p",{children:["Set Two: ",d.map((function(e,n){return Object(s.jsxs)("span",{children:[Object(s.jsx)(a.b,{to:"/setlists/songs/".concat(e.URLname),children:e.title},e.title),e.note?Object(s.jsxs)("sup",{children:["[",e.note.id,"]"]}):null,n===d.length-1?null:e.transition?" > ":", "]},e.title)}))]}):null,b.length>0?Object(s.jsxs)("p",{children:["Set Three: ",h.map((function(e,n){return Object(s.jsxs)("span",{children:[Object(s.jsx)(a.b,{to:"/setlists/songs/".concat(e.URLname),children:e.title},e.title),e.note?Object(s.jsxs)("sup",{children:["[",e.note.id,"]"]}):null,n===h.length-1?null:e.transition?" > ":", "]},e.title)}))]}):null,x.length>0?Object(s.jsxs)("p",{children:["Encore: ",x.map((function(e,n){return Object(s.jsxs)("span",{children:[Object(s.jsx)(a.b,{to:"/setlists/songs/".concat(e.URLname),children:e.title},e.title),e.note?Object(s.jsxs)("sup",{children:["[",e.note.id,"]"]}):null,n===x.length-1?null:e.transition?" > ":", "]},e.title)}))]}):null,Object(s.jsx)("ul",{children:f.map((function(e){return Object(s.jsx)("li",{children:"[".concat(e.id,"] ").concat(e.text)},e.id)}))}),O?Object(s.jsxs)("p",{children:["Notes: ",O]}):null]})};function w(){var e=Object(u.a)(["\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n    "]);return w=function(){return e},e}var y=function(e){var n=e.shows,t=g.a.main(w());return Object(s.jsx)(t,{children:n?Object(s.jsx)(s.Fragment,{children:n.map((function(e){return Object(s.jsx)(v,{show:e},e.id)}))}):null})},S=function(e){var n=e.songs,t=e.shows,c=e.Heading,r=Object(o.f)().songName,i=n?n.filter((function(e){return e.URLname===r}))[0]:null,l=t&&i?t.filter((function(e){var n=!1;for(var t in e.sets)if(e.sets[t].some((function(e){return e.URLname===r}))){n=!0;break}return n})):null;return Object(s.jsx)(s.Fragment,{children:i?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)(c,{children:[Object(s.jsx)("h1",{children:i.title}),Object(s.jsx)("p",{children:"Has been played at the following shows:"})]}),Object(s.jsx)(y,{shows:l})]}):null})},F=function(e){var n=e.venues,t=e.Heading;return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(t,{children:Object(s.jsx)("h1",{children:"Venues played by Mr. Please: "})}),n?Object(s.jsx)(s.Fragment,{children:Object(s.jsx)("ul",{children:n.map((function(e){return Object(s.jsx)("li",{children:Object(s.jsx)(a.b,{to:"/setlists/venues/".concat(e.URLname),children:e.name})},e.id)}))})}):null]})},L=function(e){var n=e.venues,t=e.shows,c=e.Heading,r=Object(o.f)().venueName,i=n?n.filter((function(e){return e.URLname===r}))[0]:null,l=t&&i?t.filter((function(e){return e.venue.name===i.name})):null;return Object(s.jsx)(s.Fragment,{children:i?Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)(c,{children:[Object(s.jsx)("h1",{children:i.name}),Object(s.jsx)("p",{children:"Has hosted the following shows:"})]}),Object(s.jsx)(y,{shows:l})]}):null})},R=t(18),U=t.n(R),H="/api",N={getShows:function(){return U()({method:"get",url:"/shows",baseURL:H}).then((function(e){return e.data})).catch((function(e){return console.log(e)}))},getSongs:function(){return U()({method:"get",url:"/songs",baseURL:H}).then((function(e){return e.data})).catch((function(e){return console.log(e)}))},getVenues:function(){return U()({method:"get",url:"/venues",baseURL:H}).then((function(e){return e.data})).catch((function(e){return console.log(e)}))}};function P(){var e=Object(u.a)(["\n    display: flex;\n    flex-direction:column;\n    align-items: center;\n  "]);return P=function(){return e},e}var k=function(){var e=Object(c.useState)(""),n=Object(O.a)(e,2),t=n[0],r=n[1],i=Object(c.useState)(""),l=Object(O.a)(i,2),j=l[0],u=l[1],h=Object(c.useState)(""),p=Object(O.a)(h,2),m=p[0],v=p[1];Object(c.useEffect)((function(){(function(){var e=Object(x.a)(d.a.mark((function e(){var n,t,s,c,i,l;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all([N.getShows(),N.getSongs(),N.getVenues()]);case 2:n=e.sent,t=Object(O.a)(n,3),s=t[0],c=t[1],i=t[2],l=Object(b.a)(s).sort((function(e,n){var t=e.date,s=n.date;return t.year!==s.year?t.year+s.year:t.month!==s.month?t.month+s.month:t.day+s.day})),u(l),r(c),v(i);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var w=g.a.header(P());return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsxs)("nav",{children:[Object(s.jsx)(a.b,{to:"/setlists",children:"Setlists"}),Object(s.jsx)("br",{}),Object(s.jsx)(a.b,{to:"/setlists/songs",children:"Songs"}),Object(s.jsx)("br",{}),Object(s.jsx)(a.b,{to:"/setlists/venues",children:"Venues"})]}),Object(s.jsxs)(o.c,{children:[Object(s.jsx)(o.a,{path:"/setlists/songs/:songName",children:Object(s.jsx)(S,{songs:t,shows:j,Heading:w})}),Object(s.jsx)(o.a,{path:"/setlists/songs",children:Object(s.jsx)(f,{songs:t,shows:j,Heading:w})}),Object(s.jsx)(o.a,{path:"/setlists/venues/:venueName",children:Object(s.jsx)(L,{venues:m,shows:j,Heading:w})}),Object(s.jsx)(o.a,{path:"/setlists/venues",children:Object(s.jsx)(F,{venues:m,shows:j,Heading:w})}),Object(s.jsxs)(o.a,{path:"/setlists",children:[Object(s.jsx)(w,{children:Object(s.jsx)("h1",{children:"Shows performed by Mr. Please: "})}),Object(s.jsx)(y,{shows:j})]})]})]})},M=function(){return Object(s.jsx)("div",{className:"App",children:Object(s.jsxs)(o.c,{children:[Object(s.jsx)(o.a,{path:"/setlists",children:Object(s.jsx)(k,{})}),Object(s.jsx)(o.a,{path:"/",children:Object(s.jsx)(j,{})})]})})},T=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,69)).then((function(n){var t=n.getCLS,s=n.getFID,c=n.getFCP,r=n.getLCP,i=n.getTTFB;t(e),s(e),c(e),r(e),i(e)}))};l.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(a.a,{children:Object(s.jsx)(M,{})})}),document.getElementById("root")),T()}},[[68,1,2]]]);
//# sourceMappingURL=main.8cde62f1.chunk.js.map