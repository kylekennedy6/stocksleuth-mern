(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[18],{109:function(e,t,a){},110:function(e,t,a){},117:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(26),i=a(12),o=a.n(i),l=a(15),u=a(2),s=a(9),m=a(17),p=a(25),d=a(16),E=a(11),g=a(24),v=(a(61),function(e){var t=Object(n.useContext)(E.a),a=Object(s.h)().transcriptId,c=Object(g.a)(),i=c.isLoading,v=c.error,f=c.sendRequest,h=c.clearError,b=Object(n.useState)("Unrated"),O=Object(u.a)(b,2),y=O[0],k=O[1],j=Object(n.useState)(!1),S=Object(u.a)(j,2),x=S[0],R=S[1],N=Object(n.useState)(!1),G=Object(u.a)(N,2),C=G[0],w=G[1],U=Object(s.g)(),T=function(){var n=Object(l.a)(o.a.mark((function n(r){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r.preventDefault(),n.prev=1,n.next=4,f("https://stocksleuth.herokuapp.com/api/openingStatementRatings","POST",JSON.stringify({rating:y,primaryEvidence:x,contraryEvidence:C,openingStatement:e.id,creator:t.userId}),{Authorization:"Bearer "+t.token,"Content-Type":"application/json"});case 4:U.push("/"),U.push("/users/".concat(t.username,"/transcripts/").concat(a,"/opening-statements")),n.next=10;break;case 8:n.prev=8,n.t0=n.catch(1);case 10:case"end":return n.stop()}}),n,null,[[1,8]])})));return function(e){return n.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{error:v,onClear:h}),r.a.createElement("form",{className:"rating-form",onSubmit:T},i&&r.a.createElement(d.a,{as:!0,Overlay:!0}),r.a.createElement("div",{className:"rating-container"},r.a.createElement("div",{className:"ratings-side-by-side-container"},r.a.createElement("label",null,"Rating:",r.a.createElement("select",{value:y,onChange:function(e){k(e.target.value)}},r.a.createElement("option",{value:"Unrated"},"Unrated"),r.a.createElement("option",{value:"Off-Topic"},"Off-Topic"),r.a.createElement("option",{value:"Results"},"Results"),r.a.createElement("option",{value:"Guidance"},"Guidance"),r.a.createElement("option",{value:"Magnitudinal Guidance"},"Magnitudinal Guidance"),r.a.createElement("option",{value:"Downside Guidance"},"Downside Guidance"),r.a.createElement("option",{value:"Upside Guidance"},"Upside Guidance"))),r.a.createElement("label",null,"Primary Evidence (Y/N):",r.a.createElement("input",{name:"primaryEvidence",type:"checkbox",onChange:function(e){R(!x)},checked:x})),r.a.createElement("label",null,"Contrary Evidence (Y/N)?:",r.a.createElement("input",{name:"contraryEvidence",type:"checkbox",onChange:function(e){w(e.target.checked)},checked:C})),r.a.createElement("div",{className:"rating-form__button"},r.a.createElement(m.a,{type:"submit"},"Update Ratings"))))))}),f=(a(109),function(e){var t=Object(n.useContext)(E.a),a=Object(g.a)(),c=a.isLoading,i=a.error,s=a.sendRequest,v=a.clearError,f=Object(n.useState)(e.rating),h=Object(u.a)(f,2),b=h[0],O=h[1],y=Object(n.useState)(e.primaryEvidence),k=Object(u.a)(y,2),j=k[0],S=k[1],x=Object(n.useState)(e.contraryEvidence),R=Object(u.a)(x,2),N=R[0],G=R[1],C=function(){var a=Object(l.a)(o.a.mark((function a(n){return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n.preventDefault(),a.prev=1,a.next=4,s("".concat("https://stocksleuth.herokuapp.com/api","/openingStatementRatings/").concat(e._id),"PATCH",JSON.stringify({rating:b,primaryEvidence:j,contraryEvidence:N,openingStatementRatingId:e._id,creator:t.userId}),{Authorization:"Bearer "+t.token,"Content-Type":"application/json"});case 4:a.next=8;break;case 6:a.prev=6,a.t0=a.catch(1);case 8:case"end":return a.stop()}}),a,null,[[1,6]])})));return function(e){return a.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{error:i,onClear:v}),r.a.createElement("form",{className:"rating-form",onSubmit:C},c&&r.a.createElement(d.a,{as:!0,Overlay:!0}),r.a.createElement("div",{className:"rating-container"},r.a.createElement("div",{className:"ratings-side-by-side-container"},r.a.createElement("label",null,"Rating:",r.a.createElement("select",{value:b,onChange:function(e){O(e.target.value)}},r.a.createElement("option",{value:"Unrated"},"Unrated"),r.a.createElement("option",{value:"Off-Topic"},"Off-Topic"),r.a.createElement("option",{value:"Results"},"Results"),r.a.createElement("option",{value:"Guidance"},"Guidance"),r.a.createElement("option",{value:"Magnitudinal Guidance"},"Magnitudinal Guidance"),r.a.createElement("option",{value:"Downside Guidance"},"Downside Guidance"),r.a.createElement("option",{value:"Upside Guidance"},"Upside Guidance")))),r.a.createElement("div",{className:"ratings-side-by-side-container"},r.a.createElement("label",null,"Primary Evidence (Y/N):",r.a.createElement("input",{name:"primaryEvidence",type:"checkbox",onChange:function(e){S(!j)},checked:j})),r.a.createElement("label",null,"Contrary Evidence (Y/N)?:",r.a.createElement("input",{name:"contraryEvidence",type:"checkbox",onChange:function(e){G(e.target.checked)},checked:N})),r.a.createElement("div",{className:"rating-form__button"},r.a.createElement(m.a,{type:"submit"},"Update Ratings"))))))}),h=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("li",{className:"openingStatement-item"},r.a.createElement(c.a,{className:"openingStatement-item__content"},r.a.createElement("h3",null,"OS",e.number," (Programmatic Rating: ",e.programmaticRating,")"),r.a.createElement("h5",null,e.executive),r.a.createElement("p",null,e.text),!e.openingStatementRating&&r.a.createElement(v,e),e.openingStatementRating&&r.a.createElement(f,e.openingStatementRating))))};a(110),t.a=function(e){return 0===e.items.length?r.a.createElement(c.a,{className:"empty-list-card"},r.a.createElement("h2",null,"No opening statements found.")):r.a.createElement("ul",{className:"openingStatement-list"},e.items.map((function(e){return r.a.createElement(h,{key:e._id,id:e._id,number:e.number,executive:e.executive,text:e.text,openingStatementRating:e.userOpeningStatementRating,programmaticRating:e.programmaticRating})})))}},323:function(e,t,a){"use strict";a.r(t);var n=a(12),r=a.n(n),c=a(15),i=a(2),o=a(0),l=a.n(o),u=a(9),s=a(69),m=a(117),p=a(141),d=a(25),E=a(16),g=a(24),v=a(11);t.default=function(){var e=Object(o.useContext)(v.a),t=Object(u.h)().transcriptId,a=Object(o.useState)(),n=Object(i.a)(a,2),f=n[0],h=n[1],b=Object(o.useState)(),O=Object(i.a)(b,2),y=O[0],k=O[1],j=Object(g.a)(),S=j.isLoading,x=j.error,R=j.sendRequest,N=j.clearError;return Object(o.useEffect)((function(){(function(){var a=Object(c.a)(r.a.mark((function a(){var n;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,R("".concat("https://stocksleuth.herokuapp.com/api","/openingStatements/primaryEvidence/").concat(e.username,"/").concat(t),"GET",null,{Authorization:"Bearer "+e.token});case 3:n=a.sent,h(n.openingStatementsWithUserOpeningStatementRatings),a.next=9;break;case 7:a.prev=7,a.t0=a.catch(0);case 9:case"end":return a.stop()}}),a,null,[[0,7]])})));return function(){return a.apply(this,arguments)}})()()}),[R,e.token,e.username,t]),Object(o.useEffect)((function(){(function(){var a=Object(c.a)(r.a.mark((function a(){var n;return r.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,R("".concat("https://stocksleuth.herokuapp.com/api","/exchanges/primaryEvidence/").concat(e.username,"/").concat(t),"GET",null,{Authorization:"Bearer "+e.token});case 3:n=a.sent,k(n.exchangesWithUserExchangeRatings),a.next=9;break;case 7:a.prev=7,a.t0=a.catch(0);case 9:case"end":return a.stop()}}),a,null,[[0,7]])})));return function(){return a.apply(this,arguments)}})()()}),[R,e.token,e.username,t]),l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"main-container"},l.a.createElement(s.a,null),l.a.createElement("div",{className:"content-container"},l.a.createElement(d.a,{error:x,onClear:N}),S&&l.a.createElement("div",{className:"center"},l.a.createElement(E.a,null)),!S&&f&&l.a.createElement(m.a,{items:f}),!S&&y&&l.a.createElement(p.a,{items:y}))))}}}]);
//# sourceMappingURL=18.02f3fe25.chunk.js.map