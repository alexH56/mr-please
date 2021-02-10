(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{41:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n(2),a=n.n(s),o=n(18),r=n.n(o),l=n(4),i=function(e){var t=e.show,n=t.date,s=n.month,a=n.day,o=n.year,r="".concat(s,"/").concat(a,"/").concat(o),l=t.venue.name,i=t.sets[1],u=t.sets[2],j=t.sets[3],b=t.sets.encore,h=t.showNotes;return Object(c.jsxs)("div",{children:[Object(c.jsxs)("h3",{children:[r," - ",l]}),i.length>0?Object(c.jsxs)("p",{children:["Set One: ",i.map((function(e,t){return Object(c.jsxs)("span",{children:[Object(c.jsx)("a",{href:"#",children:e.title},e.title),e.note?Object(c.jsxs)("sup",{children:["[",e.note.id,"]"]}):null,t===i.length-1?null:e.transition?" > ":", "]},e.title)}))]}):null,u.length>0?Object(c.jsxs)("p",{children:["Set Two: ",u.map((function(e){return e.title})).join(", ")]}):null,j.length>0?Object(c.jsxs)("p",{children:["Set Three: ",j.map((function(e){return e.title})).join(", ")]}):null,b.length>0?Object(c.jsxs)("p",{children:["Encore: ",b.map((function(e){return e.title})).join(", ")]}):null,h?Object(c.jsxs)("p",{children:["Notes: ",h]}):null]})},u=n(5),j=n(1),b=n(9),h=function(e){var t=e.handleDate;return Object(c.jsx)("form",{children:Object(c.jsxs)("label",{children:["Date: ",Object(c.jsx)("input",{type:"date",name:"date",min:"2020-02-01",max:(new Date).toISOString().slice(0,10),onChange:function(e){return t(e)}})]})})},d=function(e){var t=e.setID,n=e.songs,a=e.newShow,o=e.handleSongSelect,r=e.handleTransitionToggle,i=e.handleSongNote,u=Object(s.useState)(""),j=Object(l.a)(u,2),b=j[0],h=j[1],d=a.sets[t],O=d[d.length-1],f=d.length>0?O.transition?",":">":null;return Object(c.jsxs)("div",{children:[Object(c.jsxs)("p",{children:["encore"===t?"Encore: ":"Set ".concat(t,": "),d.map((function(e,t){return Object(c.jsxs)("span",{children:[Object(c.jsx)("a",{children:e.title},e.title),e.note?Object(c.jsxs)("sup",{children:["[",e.note.id,"]"]}):null,t===d.length-1?null:e.transition?" > ":", "]},e.title)}))]}),d.length>0?Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("button",{onClick:function(){return r(O,t)},children:f}),Object(c.jsxs)("form",{children:[Object(c.jsx)("input",{type:"text",value:b,onChange:function(e){return function(e){h(e.target.value)}(e)},placeholder:"Add a note to current song"}),Object(c.jsx)("button",{onClick:function(e){e.preventDefault(),i(O,t,b),h("")},children:"add"})]})]}):null,Object(c.jsx)("form",{children:Object(c.jsxs)("select",{name:"song",value:"",onChange:function(e){return o(e,t)},children:[Object(c.jsx)("option",{value:"",children:"- add a song -"}),n?n.map((function(e){return Object(c.jsx)("option",{value:e.title,children:e.title},e.title)})):null]})})]})},O=function(e){var t=e.venues,n=e.handleVenue;return Object(c.jsx)("form",{children:Object(c.jsxs)("label",{children:["Venue: ",Object(c.jsxs)("select",{name:"venue",onChange:function(e){return n(e)},children:[Object(c.jsx)("option",{value:"",children:"- select venue -"}),t?t.map((function(e){return Object(c.jsx)("option",{value:e.name,children:e.name},e.name)})):null]})]})})},f=function(e){var t=e.songs,n=e.venues,a=e.handleNewShow,o={date:{month:1,day:1,year:2001},venue:{name:"",location:{street:"",street2:"",city:"",state:"",zip:"",country:""}},sets:{1:[],2:[],3:[],encore:[]},showNotes:"",countsForStats:!1,audioLink:""},r=Object(s.useState)(o),i=Object(l.a)(r,2),f=i[0],g=i[1],x=Object(s.useState)(1),p=Object(l.a)(x,2),v=p[0],m=p[1],S=Object(s.useState)(!1),w=Object(l.a)(S,2),y=w[0],C=w[1],k=Object(s.useState)(1),F=Object(l.a)(k,2),N=F[0],T=F[1],D=function(){var e=[];for(var t in f.sets){var n=f.sets[t].filter((function(e){return e.note})).map((function(e){return e.note}));e=e.concat(n)}return e}(),I=function(e,n){var c,s,a=Object(b.a)(t);try{for(a.s();!(s=a.n()).done;){var o=s.value;o.title===e.target.value&&(c=o)}}catch(l){a.e(l)}finally{a.f()}var r=f.sets[n].concat(c);g(Object(j.a)(Object(j.a)({},f),{},{sets:Object(j.a)(Object(j.a)({},f.sets),{},Object(u.a)({},n,r))}))},L=function(e,t){if(e.transition){var n=Object.keys(e).reduce((function(t,n){return"transition"!==n&&(t[n]=e[n]),t}),{}),c=f.sets[t],s=c.slice(0,c.length-1).concat(n);g(Object(j.a)(Object(j.a)({},f),{},{sets:Object(j.a)(Object(j.a)({},f.sets),{},Object(u.a)({},t,s))}))}else{var a=Object(j.a)(Object(j.a)({},e),{},{transition:!0}),o=f.sets[t],r=o.slice(0,o.length-1).concat(a);g(Object(j.a)(Object(j.a)({},f),{},{sets:Object(j.a)(Object(j.a)({},f.sets),{},Object(u.a)({},t,r))}))}},R=function(e,t,n){var c=e.note?Object(j.a)(Object(j.a)({},e),{},{note:Object(j.a)(Object(j.a)({},e.note),{},{text:n})}):Object(j.a)(Object(j.a)({},e),{},{note:{id:N,text:n}}),s=f.sets[t],a=s.slice(0,s.length-1).concat(c);g(Object(j.a)(Object(j.a)({},f),{},{sets:Object(j.a)(Object(j.a)({},f.sets),{},Object(u.a)({},t,a))})),e.note||T(N+1)};return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"New Show:"}),Object(c.jsx)(h,{handleDate:function(e){var t=e.target.value.split("-"),n={month:parseInt(t[1]),day:parseInt(t[2]),year:parseInt(t[0])};g(Object(j.a)(Object(j.a)({},f),{},{date:n}))}}),Object(c.jsx)(O,{venues:n,handleVenue:function(e){var t,c,s=Object(b.a)(n);try{for(s.s();!(c=s.n()).done;){var a=c.value;a.name===e.target.value&&(t=a)}}catch(o){s.e(o)}finally{s.f()}g(Object(j.a)(Object(j.a)({},f),{},{venue:t}))}}),function(e){for(var n=[],s=1;s<=e;s++)n.push(Object(c.jsx)(d,{setID:s,songs:t,newShow:f,handleSongSelect:I,handleTransitionToggle:L,handleSongNote:R},s));return n}(v),y?Object(c.jsx)(d,{setID:"encore",songs:t,newShow:f,handleSongSelect:I,handleTransitionToggle:L,handleSongNote:R},"encore"):null,Object(c.jsx)("ul",{children:D.map((function(e){return Object(c.jsx)("li",{children:"[".concat(e.id,"] ").concat(e.text)},e.id)}))}),v<3?Object(c.jsx)("button",{onClick:function(){return m((function(){return v+1}))},children:"Add Set"}):null,v>1?Object(c.jsx)("button",{onClick:function(){g(Object(j.a)(Object(j.a)({},f),{},{sets:Object(j.a)(Object(j.a)({},f.sets),{},Object(u.a)({},v,[]))})),m(v-1)},children:"Remove Set"}):null,Object(c.jsx)("button",{onClick:function(){g(Object(j.a)(Object(j.a)({},f),{},{sets:Object(j.a)(Object(j.a)({},f.sets),{},{encore:[]})})),C(!y)},children:y?"Remove Encore":"Add Encore"}),Object(c.jsx)("br",{}),Object(c.jsxs)("label",{children:["Counts for stats? ",Object(c.jsx)("input",{type:"checkbox",checked:f.countsForStats,onChange:function(){var e=!f.countsForStats;g(Object(j.a)(Object(j.a)({},f),{},{countsForStats:e}))}})]}),Object(c.jsx)("br",{}),Object(c.jsxs)("label",{children:["Show notes: ",Object(c.jsx)("input",{type:"text",value:f.showNotes,onChange:function(e){return function(e){g(Object(j.a)(Object(j.a)({},f),{},{showNotes:e.target.value}))}(e)}})]}),Object(c.jsx)("br",{}),Object(c.jsx)("button",{disabled:!(f.sets[1].length>0&&2001!==f.date.year&&f.venue.name),onClick:function(){return a(f),void g(o)},children:"Submit"})]})},g=n(6),x=n.n(g),p="/api",v={getShows:function(){return x()({method:"get",url:"/shows",baseURL:p}).then((function(e){return e.data})).catch((function(e){return console.log(e)}))},getSongs:function(){return x()({method:"get",url:"/songs",baseURL:p}).then((function(e){return e.data})).catch((function(e){return console.log(e)}))},getVenues:function(){return x()({method:"get",url:"/venues",baseURL:p}).then((function(e){return e.data})).catch((function(e){return console.log(e)}))}},m="/api",S={addShow:function(e){return x()({method:"post",url:"/shows",baseURL:m,data:e}).then((function(e){return e.data})).catch((function(e){return console.log(e)}))},addSong:function(e){return x()({method:"post",url:"/songs",baseURL:m,data:e}).then((function(e){return e.data})).catch((function(e){return console.log(e)}))}},w=function(){var e=Object(s.useState)(""),t=Object(l.a)(e,2),n=t[0],a=t[1],o=Object(s.useState)(""),r=Object(l.a)(o,2),u=r[0],j=r[1],b=Object(s.useState)(""),h=Object(l.a)(b,2),d=h[0],O=h[1];Object(s.useEffect)((function(){console.log("App has loaded"),v.getSongs().then((function(e){a(e)})),v.getShows().then((function(e){j(e)})),v.getVenues().then((function(e){O(e)}))}),[]);return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsx)(f,{songs:n,venues:d,handleNewShow:function(e){S.addShow(e).then((function(e){console.log(e),j(u.concat(e))}))}}),Object(c.jsx)("h1",{children:"Songs played by Mr. Please: "}),n?Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("ul",{children:n.map((function(e){return Object(c.jsx)("li",{children:e.title},e.id)}))})}):null,Object(c.jsx)("h1",{children:"Shows performed by Mr. Please: "}),u?Object(c.jsx)(c.Fragment,{children:u.map((function(e){return Object(c.jsx)(i,{show:e},e.id)}))}):null,Object(c.jsx)("h1",{children:"Venues played by Mr. Please: "}),d?Object(c.jsx)(c.Fragment,{children:Object(c.jsx)("ul",{children:d.map((function(e){return Object(c.jsx)("li",{children:e.name},e.id)}))})}):null]})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,42)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,o=t.getTTFB;n(e),c(e),s(e),a(e),o(e)}))};r.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root")),y()}},[[41,1,2]]]);
//# sourceMappingURL=main.53aba174.chunk.js.map