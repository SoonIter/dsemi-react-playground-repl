var y=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function m(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var d={};(function(o){(function(u,h){if(typeof o.nodeName!="string")h(o);else{var r={};h(r),u.AnsiUp=r.default}})(y,function(u){var h=this&&this.__makeTemplateObject||function(i,e){return Object.defineProperty?Object.defineProperty(i,"raw",{value:e}):i.raw=e,i},r;(function(i){i[i.EOS=0]="EOS",i[i.Text=1]="Text",i[i.Incomplete=2]="Incomplete",i[i.ESC=3]="ESC",i[i.Unknown=4]="Unknown",i[i.SGR=5]="SGR",i[i.OSCURL=6]="OSCURL"})(r||(r={}));var x=function(){function i(){this.VERSION="5.1.0",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_whitelist={http:1,https:1}}return Object.defineProperty(i.prototype,"use_classes",{get:function(){return this._use_classes},set:function(e){this._use_classes=e},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"url_whitelist",{get:function(){return this._url_whitelist},set:function(e){this._url_whitelist=e},enumerable:!1,configurable:!0}),i.prototype.setup_palettes=function(){var e=this;this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(function(g){g.forEach(function(b){e.palette_256.push(b)})});for(var t=[0,95,135,175,215,255],s=0;s<6;++s)for(var n=0;n<6;++n)for(var l=0;l<6;++l){var a={rgb:[t[s],t[n],t[l]],class_name:"truecolor"};this.palette_256.push(a)}for(var f=8,c=0;c<24;++c,f+=10){var _={rgb:[f,f,f],class_name:"truecolor"};this.palette_256.push(_)}},i.prototype.escape_txt_for_html=function(e){return e.replace(/[&<>"']/gm,function(t){if(t==="&")return"&amp;";if(t==="<")return"&lt;";if(t===">")return"&gt;";if(t==='"')return"&quot;";if(t==="'")return"&#x27;"})},i.prototype.append_buffer=function(e){var t=this._buffer+e;this._buffer=t},i.prototype.get_next_packet=function(){var e={kind:r.EOS,text:"",url:""},t=this._buffer.length;if(t==0)return e;var s=this._buffer.indexOf("\x1B");if(s==-1)return e.kind=r.Text,e.text=this._buffer,this._buffer="",e;if(s>0)return e.kind=r.Text,e.text=this._buffer.slice(0,s),this._buffer=this._buffer.slice(s),e;if(s==0){if(t==1)return e.kind=r.Incomplete,e;var n=this._buffer.charAt(1);if(n!="["&&n!="]")return e.kind=r.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(n=="["){this._csi_regex||(this._csi_regex=p(h([`
                        ^                           # beginning of line
                                                    #
                                                    # First attempt
                        (?:                         # legal sequence
                          \x1B[                      # CSI
                          ([<-?]?)              # private-mode char
                          ([d;]*)                    # any digits or semicolons
                          ([ -/]?               # an intermediate modifier
                          [@-~])                # the command
                        )
                        |                           # alternate (second attempt)
                        (?:                         # illegal sequence
                          \x1B[                      # CSI
                          [ -~]*                # anything legal
                          ([\0-:])              # anything illegal
                        )
                    `],[`
                        ^                           # beginning of line
                                                    #
                                                    # First attempt
                        (?:                         # legal sequence
                          \\x1b\\[                      # CSI
                          ([\\x3c-\\x3f]?)              # private-mode char
                          ([\\d;]*)                    # any digits or semicolons
                          ([\\x20-\\x2f]?               # an intermediate modifier
                          [\\x40-\\x7e])                # the command
                        )
                        |                           # alternate (second attempt)
                        (?:                         # illegal sequence
                          \\x1b\\[                      # CSI
                          [\\x20-\\x7e]*                # anything legal
                          ([\\x00-\\x1f:])              # anything illegal
                        )
                    `])));var l=this._buffer.match(this._csi_regex);if(l===null)return e.kind=r.Incomplete,e;if(l[4])return e.kind=r.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;l[1]!=""||l[3]!="m"?e.kind=r.Unknown:e.kind=r.SGR,e.text=l[2];var a=l[0].length;return this._buffer=this._buffer.slice(a),e}if(n=="]"){if(t<4)return e.kind=r.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=r.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=v(h([`
                        (?:                         # legal sequence
                          (\x1B\\)                    # ESC                           |                           # alternate
                          (\x07)                      # BEL (what xterm did)
                        )
                        |                           # alternate (second attempt)
                        (                           # illegal sequence
                          [\0-]                 # anything illegal
                          |                           # alternate
                          [\b-]                 # anything illegal
                          |                           # alternate
                          [-]                 # anything illegal
                        )
                    `],[`
                        (?:                         # legal sequence
                          (\\x1b\\\\)                    # ESC \\
                          |                           # alternate
                          (\\x07)                      # BEL (what xterm did)
                        )
                        |                           # alternate (second attempt)
                        (                           # illegal sequence
                          [\\x00-\\x06]                 # anything illegal
                          |                           # alternate
                          [\\x08-\\x1a]                 # anything illegal
                          |                           # alternate
                          [\\x1c-\\x1f]                 # anything illegal
                        )
                    `]))),this._osc_st.lastIndex=0;{var f=this._osc_st.exec(this._buffer);if(f===null)return e.kind=r.Incomplete,e;if(f[3])return e.kind=r.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{var c=this._osc_st.exec(this._buffer);if(c===null)return e.kind=r.Incomplete,e;if(c[3])return e.kind=r.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=p(h([`
                        ^                           # beginning of line
                                                    #
                        \x1B]8;                    # OSC Hyperlink
                        [ -:<-~]*       # params (excluding ;)
                        ;                           # end of params
                        ([!-~]{0,512})        # URL capture
                        (?:                         # ST
                          (?:\x1B\\)                  # ESC                           |                           # alternate
                          (?:\x07)                    # BEL (what xterm did)
                        )
                        ([ -~]+)              # TEXT capture
                        \x1B]8;;                   # OSC Hyperlink End
                        (?:                         # ST
                          (?:\x1B\\)                  # ESC                           |                           # alternate
                          (?:\x07)                    # BEL (what xterm did)
                        )
                    `],[`
                        ^                           # beginning of line
                                                    #
                        \\x1b\\]8;                    # OSC Hyperlink
                        [\\x20-\\x3a\\x3c-\\x7e]*       # params (excluding ;)
                        ;                           # end of params
                        ([\\x21-\\x7e]{0,512})        # URL capture
                        (?:                         # ST
                          (?:\\x1b\\\\)                  # ESC \\
                          |                           # alternate
                          (?:\\x07)                    # BEL (what xterm did)
                        )
                        ([\\x20-\\x7e]+)              # TEXT capture
                        \\x1b\\]8;;                   # OSC Hyperlink End
                        (?:                         # ST
                          (?:\\x1b\\\\)                  # ESC \\
                          |                           # alternate
                          (?:\\x07)                    # BEL (what xterm did)
                        )
                    `])));var l=this._buffer.match(this._osc_regex);if(l===null)return e.kind=r.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=r.OSCURL,e.url=l[1],e.text=l[2];var a=l[0].length;return this._buffer=this._buffer.slice(a),e}}},i.prototype.ansi_to_html=function(e){this.append_buffer(e);for(var t=[];;){var s=this.get_next_packet();if(s.kind==r.EOS||s.kind==r.Incomplete)break;s.kind==r.ESC||s.kind==r.Unknown||(s.kind==r.Text?t.push(this.transform_to_html(this.with_state(s))):s.kind==r.SGR?this.process_ansi(s):s.kind==r.OSCURL&&t.push(this.process_hyperlink(s)))}return t.join("")},i.prototype.with_state=function(e){return{bold:this.bold,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}},i.prototype.process_ansi=function(e){for(var t=e.text.split(";");t.length>0;){var s=t.shift(),n=parseInt(s,10);if(isNaN(n)||n===0)this.fg=this.bg=null,this.bold=!1,this.italic=!1,this.underline=!1;else if(n===1)this.bold=!0;else if(n===3)this.italic=!0;else if(n===4)this.underline=!0;else if(n===22)this.bold=!1;else if(n===23)this.italic=!1;else if(n===24)this.underline=!1;else if(n===39)this.fg=null;else if(n===49)this.bg=null;else if(n>=30&&n<38)this.fg=this.ansi_colors[0][n-30];else if(n>=40&&n<48)this.bg=this.ansi_colors[0][n-40];else if(n>=90&&n<98)this.fg=this.ansi_colors[1][n-90];else if(n>=100&&n<108)this.bg=this.ansi_colors[1][n-100];else if((n===38||n===48)&&t.length>0){var l=n===38,a=t.shift();if(a==="5"&&t.length>0){var f=parseInt(t.shift(),10);f>=0&&f<=255&&(l?this.fg=this.palette_256[f]:this.bg=this.palette_256[f])}if(a==="2"&&t.length>2){var c=parseInt(t.shift(),10),_=parseInt(t.shift(),10),g=parseInt(t.shift(),10);if(c>=0&&c<=255&&_>=0&&_<=255&&g>=0&&g<=255){var b={rgb:[c,_,g],class_name:"truecolor"};l?this.fg=b:this.bg=b}}}}},i.prototype.transform_to_html=function(e){var t=e.text;if(t.length===0||(t=this.escape_txt_for_html(t),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return t;var s=[],n=[],l=e.fg,a=e.bg;e.bold&&s.push("font-weight:bold"),e.italic&&s.push("font-style:italic"),e.underline&&s.push("text-decoration:underline"),this._use_classes?(l&&(l.class_name!=="truecolor"?n.push(l.class_name+"-fg"):s.push("color:rgb("+l.rgb.join(",")+")")),a&&(a.class_name!=="truecolor"?n.push(a.class_name+"-bg"):s.push("background-color:rgb("+a.rgb.join(",")+")"))):(l&&s.push("color:rgb("+l.rgb.join(",")+")"),a&&s.push("background-color:rgb("+a.rgb+")"));var f="",c="";return n.length&&(f=' class="'+n.join(" ")+'"'),s.length&&(c=' style="'+s.join(";")+'"'),"<span"+c+f+">"+t+"</span>"},i.prototype.process_hyperlink=function(e){var t=e.url.split(":");if(t.length<1||!this._url_whitelist[t[0]])return"";var s='<a href="'+this.escape_txt_for_html(e.url)+'">'+this.escape_txt_for_html(e.text)+"</a>";return s},i}();function p(i){var e=i.raw[0],t=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,s=e.replace(t,"");return new RegExp(s)}function v(i){var e=i.raw[0],t=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,s=e.replace(t,"");return new RegExp(s,"g")}Object.defineProperty(u,"__esModule",{value:!0}),u.default=x})})(d);var S=m(d);const w=async o=>{const{default:u,transformSync:h}=await import("./wasm-web.f9b558c4.js");return await u(),h(o,{jsc:{parser:{syntax:"typescript",jsx:!0,tsx:!0},target:"es2022",transform:{react:{useBuiltins:!0}}}}).code};async function E(o){return{event:"SWC",compiled:await w(o)}}self.addEventListener("message",async({data:o})=>{try{const{event:u,source:h,compileOpts:r}=o;switch(u){case"SWC":self.postMessage(await E(h));break}}catch(u){const h=new S;console.log(u);const r=typeof u=="string"?h.ansi_to_html(u):u instanceof Error?u.message:"error";self.postMessage({event:"ERROR",error:r})}});
