(this.webpackJsonpvisualizer=this.webpackJsonpvisualizer||[]).push([[0],{25:function(e,t,n){e.exports=n(40)},30:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(19),o=n.n(r),s=n(8),c=n(12),l=(n(30),n(2)),u=n(3),h=n(10),d=n(9),m=n(1),f=n(11),v=n(4),g=function(e){var t=e.children,n=e.className,a=e.none,r=e.grow,o=e.outer,s=e.inner,c=e.center,l=Object(v.a)(e,["children","className","none","grow","outer","inner","center"]),u=[];return a||(u.push("section"),o?u.push("section-outer"):s?u.push("section-inner"):r&&u.push("section-grow"),c&&u.push("section-center")),n&&u.push(n),i.a.createElement("div",Object.assign({className:u.join(" ")},l),t)},b=function(e){var t=e.children,n=e.className,a=e.fluid,r=Object(v.a)(e,["children","className","fluid"]),o=[a?"container-fluid":"container"];return n&&o.push(n),i.a.createElement("div",Object.assign({className:o.join(" ")},r),t)},p=function(e){var t=e.children,n=e.className,a=Object(v.a)(e,["children","className"]),r=["row"];return n&&r.push(n),i.a.createElement("div",Object.assign({className:r.join(" ")},a),t)},y=function(e){var t=e.children,n=e.className,a=e.col,r=Object(v.a)(e,["children","className","col"]),o=[a?Array.isArray(a)?a.reduce((function(e){return e?e+=" col-"+a:e="col-"+a}),void 0):"col-"+a:"col"];return n&&o.push(n),i.a.createElement("div",Object.assign({className:o.join(" ")},r),t)},x=n(20),A=function(e){var t=e.children,n=e.className,a=e.styles,r=Object(v.a)(e,["children","className","styles"]),o=function(e){Object(x.isArray)(e)||(e=e.split(" "));var t=e.includes("primary"),n=e.includes("secondary"),a=e.includes("success"),i=e.includes("danger"),r=e.includes("warning"),o=e.includes("info"),s=e.includes("light"),c=e.includes("dark"),l=e.includes("link"),u=e.includes("outline"),h=e.includes("large"),d=e.includes("small"),m=e.includes("block"),f=["btn"];return t?u?f.push("btn-outline-primary"):f.push("btn-primary"):n?u?f.push("btn-outline-secondary"):f.push("btn-secondary"):a?u?f.push("btn-outline-success"):f.push("btn-success"):i?u?f.push("btn-outline-danger"):f.push("btn-danger"):r?u?f.push("btn-outline-warning"):f.push("btn-warning"):o?u?f.push("btn-outline-info"):f.push("btn-info"):s?u?f.push("btn-outline-light"):f.push("btn-light"):c?u?f.push("btn-outline-dark"):f.push("btn-dark"):l?u?f.push("btn-outline-link"):f.push("btn-link"):u?f.push("btn-outline-primary"):f.push("btn-primary"),h&&f.push("btn-lg"),d&&f.push("btn-sm"),m&&f.push("btn-block"),f}(a);return n&&o.push(n),i.a.createElement("button",Object.assign({className:o.join(" ")},r),t)},w=function(e){var t=e.children,n=e.className,a=e.vertical,r=e.small,o=e.medium,s=e.large,c=e.extralarge,l=e.primary,u=e.secondary,h=e.success,d=e.danger,m=e.warning,f=e.info,g=e.light,b=e.dark,p=Object(v.a)(e,["children","className","vertical","small","medium","large","extralarge","primary","secondary","success","danger","warning","info","light","dark"]),y=["navbar"];return a||(r?y.push("navbar-expand-sm"):o?y.push("navbar-expand-md"):s?y.push("navbar-expand-lg"):c?y.push("navbar-expand-xl"):y.push("navbar-expand-sm")),l?y.push("navbar-primary"):u?y.push("navbar-secondary"):h?y.push("navbar-success"):d?y.push("navbar-danger"):m?y.push("navbar-warning"):f?y.push("navbar-info"):g?y.push("navbar-light"):b&&y.push("navbar-dark"),g?y.push("bg-light"):b?y.push("bg-dark"):y.push("bg-light"),n&&y.push(n),i.a.createElement("nav",Object.assign({className:y.join(" ")},p),t)},k=function(e){var t=e.children,n=e.expanded,a=Object(v.a)(e,["children","expanded"]);return i.a.createElement(i.a.Fragment,null,i.a.createElement("button",Object.assign({className:"navbar-toggler",type:"button","aria-expanded":n,"aria-label":"Toggle navigation"},a),i.a.createElement("span",{className:"navbar-toggler-icon"})),i.a.createElement("div",{className:"collapse navbar-collapse"+(n?" show":"")},t))},E=function(e){var t=e.children,n=e.className,a=Object(v.a)(e,["children","className"]),r=["navbar-nav"];return n&&r.push(n),i.a.createElement("div",Object.assign({className:r.join(" ")},a),t)},S=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e))).state={expanded:!1},n.onClickExpand=n.onClickExpand.bind(Object(m.a)(n)),n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"onClickExpand",value:function(){this.setState({expanded:!this.state.expanded})}},{key:"render",value:function(){return i.a.createElement(w,{large:!0,dark:!0},i.a.createElement(s.b,{to:"/",className:"navbar-brand"},i.a.createElement("h1",null,"Visualizer")),i.a.createElement(k,{expanded:this.state.expanded,onClick:this.onClickExpand},i.a.createElement(E,null,i.a.createElement(s.b,{to:"/",className:"nav-link"},"Home"),i.a.createElement(s.b,{to:"/sort",className:"nav-link"},"Sort"),i.a.createElement(s.b,{to:"/maze",className:"nav-link"},"Maze"),i.a.createElement(s.b,{to:"/test",className:"nav-link"},"Test"))))}}]),t}(i.a.Component),C=function(){return i.a.createElement("pre",{style:{color:"black"}},i.a.createElement("code",null,'<Section outer>\n  <Section>\n    <Navigation />\n  </Section>\n  <Section grow center>\n    <Route exact path="/" component={Home} />\n    <Route path="/sort" component={Sort} />\n    <Route path="/maze" component={MazePage} />\n  </Section>\n</Section>'))},j=n(24),R=function(){function e(t,n){Object(l.a)(this,e),this.data=t,this.frameRate=n,this.queue=[],this.getData=this.getData.bind(this),this.initialize=this.initialize.bind(this),this.update=this.update.bind(this),this.animate=this.animate.bind(this)}return Object(u.a)(e,[{key:"getData",value:function(){return this.data}},{key:"initialize",value:function(e){this.timeStamp=void 0,e&&(this.data=this._clone(e))}},{key:"update",value:function(e){this.queue.push(e)}},{key:"animate",value:function(e){this.timeStamp||(this.timeStamp=e);var t=e-this.timeStamp;for(this.timeStamp=e;this.queue.length>0&&t>=this.frameRate;){t-=this.frameRate;for(var n=this.queue.shift(),a=0;a<n.length;a+=2)this.data[n[a]]=n[a+1]}return this.timeStamp-=t,{animating:0!==this.queue.length,data:this.data}}},{key:"_clone",value:function(e){var t=this;return e.map((function(e){return Array.isArray(e)?t._clone(e):e}))}}]),e}();var O=n(23),N=n.n(O);function M(e,t,n){t();for(var a=e.length-1;a>=0;a--){var i=Math.floor(Math.random()*a);z(e,a,i),n([a,e[a],i,e[i]])}}function _(e,t,n){t();for(var a=e.length,i=0;i<a/2;i++){var r=a-i-1;z(e,i,r),n([i,e[i],r,e[r]])}}function F(e,t,n){t();for(var a=e.length-1,i=0;i<a;i++){for(var r=0,o=0;o<a-i;o++)e[o]>e[o+1]&&(z(e,o,o+1),n([o,e[o],o+1,e[o+1]]),r++);if(0===r)break}}function L(e,t,n){t();for(var a=e.length,i=1;i<a;i++){for(var r=e[i],o=i-1;o>=0&&e[o]>r;)e[o+1]=e[o],n([o+1,e[o+1]]),o-=1;e[o+1]=r,n([o+1,e[o+1]])}}function B(e,t,n){t();var a=function(e,t,a,i){var r=a+1;if(!(e[a]<=e[r]))for(;t<=a&&r<=i;)if(e[t]<=e[r])t++;else{for(var o=e[r],s=r;s!==t;)e[s]=e[s-1],n([s,e[s]]),s--;e[t]=o,n([t,e[t]]),t++,a++,r++}};!function e(t,n,i){if(n<i){var r=Math.floor(n+(i-n)/2);e(t,n,r),e(t,r+1,i),a(t,n,r,i)}}(e,0,e.length-1)}function T(e,t,n){t();var a=function(e,t,a){if(a-t>2){var i=Math.floor(t+(a-t)/2);e[t]<e[i]&&e[i]<e[a]?(z(e,i,a),n([i,e[i],a,e[a]])):e[t]>e[i]&&e[i]>e[a]&&(z(e,i,a),n([i,e[i],a,e[a]]))}for(var r=e[a],o=t-1,s=t;s<=a-1;s++)e[s]<r&&(z(e,++o,s),n([o,e[o],s,e[s]]));return z(e,o+1,a),n([o+1,e[o+1],a,e[a]]),o+1};!function e(t,n,i){var r;return N.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:n<i&&(r=a(t,n,i),e(t,n,r-1),e(t,r+1,i));case 1:case"end":return o.stop()}}))}(e,0,e.length-1)}function z(e,t,n){var a=e[t];e[t]=e[n],e[n]=a}var D=function(e){function t(e){var n;Object(l.a)(this,t),n=Object(h.a)(this,Object(d.a)(t).call(this,e));for(var a=[],i=0;i<100;i++)a.push(i);return n.state={running:!1,rendering:!1},n.vector=new R(a,8),n.run=n.run.bind(Object(m.a)(n)),n.shuffleAction=n.shuffleAction.bind(Object(m.a)(n)),n.reverseAction=n.reverseAction.bind(Object(m.a)(n)),n.bubbleSortAction=n.bubbleSortAction.bind(Object(m.a)(n)),n.insertionSortAction=n.insertionSortAction.bind(Object(m.a)(n)),n.mergeSortAction=n.mergeSortAction.bind(Object(m.a)(n)),n.quickSortAction=n.quickSortAction.bind(Object(m.a)(n)),n.renderCanvas=n.renderCanvas.bind(Object(m.a)(n)),n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.frame=window.requestAnimationFrame(this.renderCanvas)}},{key:"componentWillUnmount",value:function(){window.cancelAnimationFrame(this.frame)}},{key:"run",value:function(e){var t=this;this.setState({running:!0,rendering:!0},(function(){e(Object(j.a)(t.vector.getData()),t.vector.initialize,t.vector.update),t.setState({running:!1})}))}},{key:"shuffleAction",value:function(){this.run(M)}},{key:"reverseAction",value:function(){this.run(_)}},{key:"bubbleSortAction",value:function(){this.run(F)}},{key:"insertionSortAction",value:function(){this.run(L)}},{key:"mergeSortAction",value:function(){this.run(B)}},{key:"quickSortAction",value:function(){this.run(T)}},{key:"renderCanvas",value:function(e){var t=this.vector.animate(e),n=t.animating,a=t.data;n||this.state.running||this.setState({rendering:!1}),function(e,t){var n=t.length,a=e.getBoundingClientRect(),i=a.width,r=a.height,o=window.devicePixelRatio;e.width=i*o,e.height=r*o;var s=.9*Math.floor(i/n),c=Math.floor(.8*s),l=e.getContext("2d");l.clearRect(0,0,i,r),l.fillStyle="black";for(var u=0;u<n;u++){var h=Math.floor((t[u]+1)/100*.8*r);l.fillRect(.05*i+u*s,.9*r-h,c,h)}}(this.canvas,a),this.frame=window.requestAnimationFrame(this.renderCanvas)}},{key:"render",value:function(){var e=this;return i.a.createElement(g,{inner:!0},i.a.createElement(b,{fluid:!0,className:"mt-5"},i.a.createElement(p,{row:"sm"},i.a.createElement(y,{col:"sm",className:"d-flex justify-content-around align-items-center"},i.a.createElement(A,{styles:"primary",disabled:this.state.running||this.state.rendering,onClick:this.shuffleAction},"Shuffle"),i.a.createElement(A,{styles:"primary",disabled:this.state.running||this.state.rendering,onClick:this.reverseAction},"Reverse"),i.a.createElement(A,{styles:"primary",disabled:this.state.running||this.state.rendering,onClick:this.bubbleSortAction},"Bubble Sort"),i.a.createElement(A,{styles:"primary",disabled:this.state.running||this.state.rendering,onClick:this.insertionSortAction},"Insertion Sort"),i.a.createElement(A,{styles:"primary",disabled:this.state.running||this.state.rendering,onClick:this.mergeSortAction},"Merge Sort"),i.a.createElement(A,{styles:"primary",disabled:this.state.running||this.state.rendering,onClick:this.quickSortAction},"Quick Sort")))),i.a.createElement("canvas",{className:"flex-grow-1",ref:function(t){return e.canvas=t}}))}}]),t}(i.a.Component),P=function(){function e(t,n){Object(l.a)(this,e),this.data=t,this.frameRate=n,this.queue=[],this.getData=this.getData.bind(this),this.initialize=this.initialize.bind(this),this.update=this.update.bind(this),this.animate=this.animate.bind(this)}return Object(u.a)(e,[{key:"getData",value:function(){return this.data}},{key:"initialize",value:function(e){this.timeStamp=void 0,e&&(this.data=this._clone(e))}},{key:"update",value:function(e){this.queue.push(e)}},{key:"animate",value:function(e){this.timeStamp||(this.timeStamp=e);var t=e-this.timeStamp;for(this.timeStamp=e;this.queue.length>0&&t>=this.frameRate;){t-=this.frameRate;for(var n=this.queue.shift(),a=0;a<n.length;a+=3)this.data[n[a+1]][n[a]]=n[a+2]}return this.timeStamp-=t,{animating:0!==this.queue.length,data:this.data}}},{key:"_clone",value:function(e){var t=this;return e.map((function(e){return Array.isArray(e)?t._clone(e):e}))}}]),e}(),U=[{x:-1,y:0},{x:0,y:-1},{x:1,y:0},{x:0,y:1}],V=.8;function q(e,t,n){W(e,1),t(e),Y(e,n,G,{x:1,y:1})}function I(e,t,n){var a=[],i=0,r=function(e,t){e[t.y][t.x]=0,a[t.y][t.x]=i};W(e,1),t(e);for(var o=e.length,s=e[0].length,c=0;c<o;c++)a.push(Array(s).fill(0));!function(e,t,n,a,i,r,o,s){for(var c=[],l=0;l<o;l++){var u=1+(K(1,3+s)<<1),h=K(0,1+u>>1)<<1,d=u,m=u;0===K(0,1)?d+=h:m+=h;for(var f=1+(K(0,n-d-1>>1)<<1),v=1+(K(0,a-m-1>>1)<<1),g={x:f,y:v,width:d,height:m},b=!1,p=0;p<c.length;p++){var y=c[p];if(X(g,y)){b=!0;break}}if(!b){c.push(g),i();for(var x=0;x<d;x++){for(var A=[],w=0;w<m;w++)r(e,{x:f+x,y:v+w}),A.push(f+x,v+w,e[v+w][f+x]);t(A)}}}}(e,n,s,o,(function(e,t){i++}),r,256,4);for(var l=1;l<o;l+=2)for(var u=1;u<s;u+=2)0!==e[l][u]&&(i++,Y(e,n,r,{x:u,y:l}));!function(e,t,n,a,i,r){for(var o=[],s=1;s<a-1;s++)for(var c=1;c<n-1;c++)if(1===e[s][c]){for(var l=[],u=0;u<U.length;u++){var h=U[u],d=r[s+h.y][c+h.x];0===d||l.includes(d)||l.push(d)}l.length<2||o.push({x:c,y:s,regions:l})}for(var m=[0],f=[],v=1;v<=i;v++)m.push(v),f.push(v);var g=function(){var n=K(0,o.length-1),a=o[n];G(e,{x:a.x,y:a.y}),t([a.x,a.y,e[a.y][a.x]]);for(var r=a.regions.map((function(e){return m[e]})),s=r[0],c=r.slice(1),l=0;l<=i;l++)c.includes(l)&&(m[l]=s);f=f.filter((function(e){return!c.includes(e)})),o=o.filter((function(n){if(Math.abs(n.x-a.x)<=1&&Math.abs(n.y-a.y)<=1)return!1;n.regions=n.regions.map((function(e){return m[e]}));for(var i=1;i<n.regions.length;i++)if(n.regions[i]!==n.regions[0])return!0;return 0===K(0,99)&&(G(e,{x:n.x,y:n.y}),t([n.x,n.y,e[n.y][n.x]])),!1}))};for(;f.length>1;)g()}(e,n,s,o,i,a),function(e,t,n,a){var i=!1;for(;!i;){i=!0;for(var r=1;r<a-1;r++)for(var o=1;o<n-1;o++)if(1!==e[r][o]){for(var s=0,c=0;c<U.length;c++){var l=U[c];1!==e[r+l.y][o+l.x]&&s++}1===s&&(i=!1,H(e,{x:o,y:r}),t([o,r,e[r][o]]))}}}(e,n,s,o)}function W(e,t){for(var n=e.length,a=0;a<n;a++)e[a].fill(t)}function Y(e,t){var n,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:G,i=arguments.length>3?arguments[3]:void 0,r=e.length,o=e[0].length,s=[];for(a(e,i),t([i.x,i.y,e[i.y][i.x]]),e[i.y][i.x]=0,s.push(i);s.length>0;){for(var c=s[s.length-1],l=[],u=0;u<U.length;u++){var h=U[u];J(e,o,r,c,h)&&l.push(h)}if(l.length>0){var d=void 0,m=Q(c,d=l.includes(n)&&Math.random()>V?n:l[Math.floor(Math.random()*l.length)],1),f=Q(c,d,2);a(e,m),a(e,f),t([m.x,m.y,e[m.y][m.x],f.x,f.y,e[f.y][f.x]]),s.push(Q(c,d,2)),n=d}else s.pop(),n=null}}function H(e,t){e[t.y][t.x]=1}function G(e,t){e[t.y][t.x]=0}function J(e,t,n,a,i){if(!function(e,t,n){if(n.x<0||n.y<0||n.x>=e||n.y>=t)return!1;return!0}(t,n,Q(a,i,3)))return!1;var r=Q(a,i,2);return 1===e[r.y][r.x]}function Q(e,t,n){return{x:e.x+t.x*n,y:e.y+t.y*n}}function K(e,t){return Math.floor(Math.random()*(t-e+1))+e}function X(e,t){return!(e.x>t.x+t.width||t.x>e.x+e.width)&&!(e.y>t.y+t.height||t.y>e.y+e.height)}var $=function(e){function t(e){var n;Object(l.a)(this,t),n=Object(h.a)(this,Object(d.a)(t).call(this,e));for(var a=[],i=0;i<99;i++)a.push(Array(99).fill(1));return n.grid=new P(a,6),n.run=n.run.bind(Object(m.a)(n)),n.onClickCreateMaze=n.onClickCreateMaze.bind(Object(m.a)(n)),n.onClickCreateDungeon=n.onClickCreateDungeon.bind(Object(m.a)(n)),n.onResize=n.onResize.bind(Object(m.a)(n)),n.renderCanvas=n.renderCanvas.bind(Object(m.a)(n)),n.state={running:!1,rendering:!1,screenWidth:window.screen.width,screenHeight:window.screen.height},n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.onResize),this.frame=window.requestAnimationFrame(this.renderCanvas)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.onResize),window.cancelAnimationFrame(this.frame)}},{key:"run",value:function(e){var t=this;this.setState({running:!0,rendering:!0},(function(){e(t._clone(t.grid.getData()),t.grid.initialize,t.grid.update),t.setState({running:!1})}))}},{key:"onClickCreateMaze",value:function(){this.run(q)}},{key:"onClickCreateDungeon",value:function(){this.run(I)}},{key:"onResize",value:function(){window.screen.width===this.width&&window.screen.height===this.height||(this.width=window.screen.width,this.height=window.screen.height,this.setState({screenWidth:this.width,screenHeight:this.height}))}},{key:"renderCanvas",value:function(e){var t=this.grid.animate(e),n=t.animating,a=t.data;n||this.state.running||this.setState({rendering:!1}),function(e,t,n){var a=t.length,i=t[0].length,r=e.getBoundingClientRect(),o=r.width,s=r.height;e.width=o,e.height=s;var c=Math.floor(o/i),l=Math.floor(s/a),u=e.getContext("2d");u.clearRect(0,0,o,s);for(var h=0;h<a;h++)for(var d=0;d<i;d++)u.fillStyle=n[t[h][d]],u.fillRect(d*c,h*l,c,l)}(this.canvas,a,["black","sienna"]),this.frame=window.requestAnimationFrame(this.renderCanvas)}},{key:"_clone",value:function(e){var t=this;return e.map((function(e){return Array.isArray(e)?t._clone(e):e}))}},{key:"render",value:function(){var e=this,t="sm-6",n="sm-6";return this.state.screenWidth/this.state.screenHeight<16/9&&(t="sm-8",n="sm-4"),i.a.createElement(g,{inner:!0},i.a.createElement(b,{fluid:!0,className:"h-100 mt-5"},i.a.createElement(p,{className:"h-100"},i.a.createElement(y,{col:t},i.a.createElement("canvas",{className:"w-100 h-100",ref:function(t){return e.canvas=t}})),i.a.createElement(y,{col:n,className:"d-flex flex-column justify-content-around align-items-start"},i.a.createElement(A,{styles:"primary large",disabled:this.state.running||this.state.rendering,onClick:this.onClickCreateMaze},"Create Maze"),i.a.createElement(A,{styles:"primary large",disabled:this.state.running||this.state.rendering,onClick:this.onClickCreateDungeon},"Create Dungeon")))))}}]),t}(i.a.Component),Z=n(5);function ee(e,t,n){var a=e.createShader(t);return e.shaderSource(a,n),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS)?a:(alert("An error occurred compiling the shaders: "+e.getShaderInfoLog(a)),e.deleteShader(a),null)}var te=function(){function e(t){Object(l.a)(this,e),this.gl=t,this.draw=this.draw.bind(this);var n=this._initShaders(t);this.model={program:n,attribLocations:{vertexPosition:t.getAttribLocation(n,"aVertexPosition"),vertexColor:t.getAttribLocation(n,"aVertexColor"),vertexNormal:t.getAttribLocation(n,"aVertexNormal")},uniformLocations:{projectionMatrix:t.getUniformLocation(n,"uProjectionMatrix"),modelViewMatrix:t.getUniformLocation(n,"uModelViewMatrix"),normalMatrix:t.getUniformLocation(n,"uNormalMatrix"),lightPos:t.getUniformLocation(n,"uLightPos")},buffers:this._initBuffers(t)}}return Object(u.a)(e,[{key:"draw",value:function(e,t,n){var a=this.gl,i=this.model,r=this.model.buffers,o=a.FLOAT;a.bindBuffer(a.ARRAY_BUFFER,r.position),a.vertexAttribPointer(i.attribLocations.vertexPosition,3,o,!1,0,0),a.enableVertexAttribArray(i.attribLocations.vertexPosition);var s=a.FLOAT;a.bindBuffer(a.ARRAY_BUFFER,r.normal),a.vertexAttribPointer(i.attribLocations.vertexNormal,3,s,!1,0,0),a.enableVertexAttribArray(i.attribLocations.vertexNormal);var c=a.FLOAT;a.bindBuffer(a.ARRAY_BUFFER,r.color),a.vertexAttribPointer(i.attribLocations.vertexColor,4,c,!1,0,0),a.enableVertexAttribArray(i.attribLocations.vertexColor),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,r.indices);var l=Z.a();Z.b(l,n),Z.h(l,l);var u=Z.a();Z.c(u,t,n),a.useProgram(i.program),a.uniformMatrix4fv(i.uniformLocations.projectionMatrix,!1,e),a.uniformMatrix4fv(i.uniformLocations.modelViewMatrix,!1,u),a.uniformMatrix4fv(i.uniformLocations.normalMatrix,!1,l),a.uniform3f(i.uniformLocations.lightPos,0,20,0);var h=a.UNSIGNED_SHORT;a.drawElements(a.TRIANGLES,36,h,0)}},{key:"_initShaders",value:function(e){return function(e,t,n){var a=ee(e,e.VERTEX_SHADER,t),i=ee(e,e.FRAGMENT_SHADER,n),r=e.createProgram();return e.attachShader(r,a),e.attachShader(r,i),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS)?r:(alert("Unable to initialize the shader program: "+e.getProgramInfoLog(r)),null)}(e,"\n      attribute vec4 aVertexPosition;\n      attribute vec4 aVertexColor;\n      attribute vec3 aVertexNormal;\n\n      uniform mat4 uNormalMatrix;\n      uniform mat4 uModelViewMatrix;\n      uniform mat4 uProjectionMatrix;\n\n      varying lowp vec4 vColor;\n      varying highp vec3 vLighting;\n\n      void main(void) {\n        // Calculate position\n        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n        \n        // Apply color\n        vColor = aVertexColor;\n\n        // Apply lighting effect\n        highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);\n        highp vec3 directionalLightColor = vec3(1, 1, 1);\n        highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));\n        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);\n        highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);\n        vLighting = ambientLight + (directionalLightColor * directional);\n      }\n    ","\n      varying lowp vec4 vColor;\n      varying highp vec3 vLighting;\n\n      void main(void) {\n        gl_FragColor = vec4(vColor.rgb * vLighting, vColor.a);\n      }\n    ")}},{key:"_initBuffers",value:function(e){var t=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,1,-1,1,1,1,1,-1,1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,-1,1,-1,-1,1,1,1,1,1,1,1,-1,-1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1]),e.STATIC_DRAW);var n=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0]),e.STATIC_DRAW);for(var a=[[1,1,1,1],[1,0,0,1],[0,1,0,1],[0,0,1,1],[1,1,0,1],[1,0,1,1]],i=[],r=0;r<a.length;++r){var o=a[0];i=i.concat(o,o,o,o)}var s=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,s),e.bufferData(e.ARRAY_BUFFER,new Float32Array(i),e.STATIC_DRAW);var c=e.createBuffer();return e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,c),e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23]),e.STATIC_DRAW),{position:t,normal:n,color:s,indices:c}}}]),e}(),ne=function(){function e(){Object(l.a)(this,e),this.totalTime=0,this.initScene=this.initScene.bind(this),this.drawScene=this.drawScene.bind(this)}return Object(u.a)(e,[{key:"initScene",value:function(e,t){var n=new te(e);this.scene={actors:[],camera:[0,0,50],cameraRotation:0};for(var a=0;a<t.length;a++)this.scene.actors.push({model:n,location:[.5*(a-(t.length-1)/2),0,0],scale:[.1,.1*(t[a]+1),.2],rotation:0})}},{key:"drawScene",value:function(e,t,n){var a=this.scene;!function(e){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT)}(e);var i=45*Math.PI/180,r=e.canvas.clientWidth/e.canvas.clientHeight,o=Z.a();Z.d(o,i,r,.1,100);var s=Z.a();Z.g(s,s,a.camera),Z.b(s,s);for(var c=0;c<a.actors.length;c++){var l=a.actors[c];this._renderActor(o,s,l),this._animateActor(l,t,n[c])}this.totalTime+=t,this.totalTime>=10&&(this.totalTime-=10,this.shuffle(n)),a.cameraRotation+=t}},{key:"shuffle",value:function(e){for(var t=function(e,t,n){var a=e[t];e[t]=e[n],e[n]=a},n=e.length-1;n>=0;n--){t(e,n,Math.floor(Math.random()*n))}}},{key:"_renderActor",value:function(e,t,n){var a=n.model,i=Z.a();Z.e(i,i,n.rotation,[1,0,0]),Z.g(i,i,n.location),Z.f(i,i,n.scale),a.draw(e,t,i)}},{key:"_animateActor",value:function(e,t,n){e.scale[1]=.1*(n+1),e.rotation+=t}}]),e}(),ae=function(e){function t(e){var n;Object(l.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e))).renderCanvas=n.renderCanvas.bind(Object(m.a)(n)),n.scene=new ne,n.data=[];for(var a=0;a<100;a++)n.data.push(a);return n}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this.canvas,t=e.getBoundingClientRect();e.width=t.width,e.height=t.height,this.gl=e.getContext("webgl"),null===this.gl?alert("Unable to initialize WebGL. Your browser or machine may not support it."):(this.scene.initScene(this.gl,this.data),this.frame=window.requestAnimationFrame(this.renderCanvas))}},{key:"componentWillUnmount",value:function(){window.cancelAnimationFrame(this.frame)}},{key:"renderCanvas",value:function(e){e*=.001,this.timeStamp||(this.timeStamp=e);var t=e-this.timeStamp;this.timeStamp=e,this.scene.drawScene(this.gl,t,this.data),this.frame=window.requestAnimationFrame(this.renderCanvas)}},{key:"render",value:function(){var e=this;return i.a.createElement(g,{inner:!0},i.a.createElement("canvas",{className:"flex-grow-1",ref:function(t){return e.canvas=t}}))}}]),t}(i.a.Component),ie=function(){return i.a.createElement(g,{outer:!0},i.a.createElement(g,null,i.a.createElement(S,null)),i.a.createElement(g,{grow:!0,center:!0},i.a.createElement(c.a,{exact:!0,path:"/",component:C}),i.a.createElement(c.a,{path:"/sort",component:D}),i.a.createElement(c.a,{path:"/maze",component:$}),i.a.createElement(c.a,{path:"/test",component:ae})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(s.a,{basename:"/visualizer"},i.a.createElement(c.a,{path:"/",component:ie})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[25,1,2]]]);
//# sourceMappingURL=main.21b68a92.chunk.js.map