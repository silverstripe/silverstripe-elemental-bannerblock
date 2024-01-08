!function(){"use strict";var e={274:function(e,t,n){var l,a=(l=n(521))&&l.__esModule?l:{default:l};window.document.addEventListener("DOMContentLoaded",(()=>{(0,a.default)()}))},521:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l=i(n(648)),a=i(n(248)),o=i(n(292));function i(e){return e&&e.__esModule?e:{default:e}}t.default=()=>{l.default.component.registerMany({BlockLinkField:a.default,BlockLinkFieldActions:o.default})}},248:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.Component=void 0;var l=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=f(t);if(n&&n.has(e))return n.get(e);var l={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var i=a?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(l,o,i):l[o]=e[o]}return l.default=e,n&&n.set(e,l),l}(n(363)),a=c(n(86)),o=c(n(42)),i=c(n(264)),s=c(n(754)),r=c(n(820)),d=n(595),u=n(648);function c(e){return e&&e.__esModule?e:{default:e}}function f(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(f=function(e){return e?n:t})(e)}const p=(0,u.loadComponent)((0,d.createInsertLinkModal)("SilverStripe\\CMS\\Controllers\\CMSPageEditController","editorInternalLink"));class h extends l.Component{constructor(e){super(e),this.handleCloseModal=this.handleCloseModal.bind(this),this.handleClick=this.handleClick.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.handleSubmitModal=this.handleSubmitModal.bind(this),this.state={isDirty:!1,modalOpen:!1,value:{}}}componentDidMount(){this.componentDidUpdate()}componentDidUpdate(){const e=this.props.value,t=e?JSON.parse(e):{},n=this.state.value;["PageID","TargetBlank","Text","Description"].some((e=>t[e]!==n[e]))&&this.setState({value:t})}getClassNames(){const{extraClass:e}=this.props;return(0,r.default)("form-control","d-flex","justify-content-start","p-2","align-items-center",e)}getLinkRelativeUrl(){const e=this.getLinkedPage();if(e){return`/${(e.URLSegment||e).replace(/^\/+/,"")}`}return""}getActions(){return i.default.LINK_ACTIONS.map((e=>e.callback?e:"clear"===e.value?{...e,callback:()=>{this.setState({value:{}});const{onChange:e}=this.props;e&&e(JSON.stringify({}))}}:e))}getLinkedPage(){const{linkedPage:e,data:t}=this.props;return!t||e&&Object.keys(e).length?e:t.linkedPage}registerChange(){this.setState({isDirty:!0})}handleClick(e){"button"!==e.target.type&&this.setState({modalOpen:!0})}handleKeyUp(e){13===e.keyCode&&this.handleClick(e)}handleCloseModal(){this.setState({modalOpen:!1})}handleSubmitModal(e){const{SecurityID:t,action_insert:n,...l}=e;this.setState({value:l});const{onChange:a}=this.props;a&&a(JSON.stringify(l)),this.registerChange(),this.handleCloseModal()}renderActions(){const{BlockLinkFieldActionsComponent:e}=this.props,t={id:"foo",actions:this.getActions()};return e?l.default.createElement("div",{className:"block-link-field__actions"},l.default.createElement(e,t)):null}renderLinkContent(){const{isDirty:e,value:t}=this.state,n=(0,r.default)("align-self-center","block-link-field__content","mr-auto","d-flex","justify-content-start");if(e)return l.default.createElement("span",{className:n},l.default.createElement("span",{className:"block-link-field__content--message-modified"},s.default._t("BlockLinkField.ModifiedMessage","Changes will be visible upon save")));const a=this.getLinkedPage();return t.PageID&&a.URLSegment?l.default.createElement("span",{className:n},t.Text&&l.default.createElement("span",{className:"block-link-field__title"},t.Text),l.default.createElement("span",{className:"block-link-field__link"},this.getLinkRelativeUrl())):l.default.createElement("span",{className:n},l.default.createElement("span",{className:"block-link-field__content--message-add-link"},s.default._t("BlockLinkField.AddLinkMessage","Add link")))}renderModal(){const{title:e,showLinkText:t,InsertModalLinkComponent:n}=this.props,{modalOpen:a,value:o}=this.state;return l.default.createElement(n,{isOpen:a,onInsert:this.handleSubmitModal,onClosed:this.handleCloseModal,title:e,fileAttributes:o,bodyClassName:"modal__dialog",identifier:"Admin.InsertLinkInternalModal",requireLinkText:t})}render(){const{name:e}=this.props,{value:t}=this.state;return l.default.createElement("div",{className:this.getClassNames(),onClick:this.handleClick,onKeyUp:this.handleKeyUp,role:"button",tabIndex:0},l.default.createElement("span",{className:"block-link-field__icon"}),this.renderLinkContent(),this.renderActions(),l.default.createElement("input",{type:"hidden",name:e,value:JSON.stringify(t)}),this.renderModal())}}t.Component=h;const k=a.default.shape({URLSegment:a.default.string});h.propTypes={BlockLinkFieldActionsComponent:a.default.oneOfType([a.default.node,a.default.func]),extraClass:a.default.string,linkedPage:k,showLinkText:a.default.bool,onChange:a.default.func,title:a.default.string,value:a.default.string},h.defaultProps={linkedPage:{},showLinkText:!0,value:"{}",InsertModalLinkComponent:p};t.default=(0,u.inject)(["BlockLinkFieldActions"],(e=>({BlockLinkFieldActionsComponent:e})),(()=>"ElementEditor.BlockLinkFieldComponent"))((0,o.default)(h))},292:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.Component=void 0;var l=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=d(t);if(n&&n.has(e))return n.get(e);var l={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var i=a?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(l,o,i):l[o]=e[o]}return l.default=e,n&&n.set(e,l),l}(n(363)),a=r(n(86)),o=r(n(820)),i=n(127),s=n(648);function r(e){return e&&e.__esModule?e:{default:e}}function d(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(d=function(e){return e?n:t})(e)}class u extends l.Component{constructor(e){super(e),this.handleChangeValue=this.handleChangeValue.bind(this)}getOptionByValue(e){return this.props.actions.find((t=>t.value===e))}handleChangeValue(e){e.stopPropagation();let t=null;const n=this.getOptionByValue(e.target.value);return void 0===n?null:(t="function"==typeof n.confirm?n.confirm().then((()=>n.callback())).catch((e=>{if("cancelled"!==e)throw e})):n.callback()||Promise.resolve(),t)}render(){const{id:e,actions:t,ActionMenu:n}=this.props,a=t.map((e=>{const t=(0,o.default)("block-link-field__action","dropdown-item",e.className||"");return l.default.createElement(i.DropdownItem,{type:"button",className:t,key:e.value,onClick:this.handleChangeValue,value:e.value},e.label)})).filter((e=>e));return a.length?l.default.createElement("div",{className:"block-link-field-actions fieldholder-small input-group"},l.default.createElement(n,{id:e,className:"block-link-field-actions__menu"},a)):null}}t.Component=u,u.propTypes={id:a.default.string.isRequired,actions:a.default.arrayOf(a.default.shape({value:a.default.string.isRequired,label:a.default.string.isRequired,className:a.default.string,destructive:a.default.bool,callback:a.default.func,canApply:a.default.func,confirm:a.default.func})),ActionMenu:a.default.oneOfType([a.default.node,a.default.func])},u.defaultProps={id:"",actions:[],ActionMenu:null};t.default=(0,s.inject)(["ActionMenu"],(e=>({ActionMenu:e})),(()=>"BlockLinkFieldActions"))(u)},264:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l,a=(l=n(754))&&l.__esModule?l:{default:l};t.default={LINK_ACTIONS:[{value:"clear",label:a.default._t("BlockLinkField.ClearLink","Clear link"),className:"",destructive:!0,canApply:()=>!0,callback:null}]}},138:function(e,t,n){var l=s(n(311)),a=s(n(363)),o=n(691),i=n(648);function s(e){return e&&e.__esModule?e:{default:e}}l.default.entwine("ss",(e=>{e(".js-injector-boot .form__field-holder .block-link-field[data-useEntwine]").entwine({ReactRoot:null,onmatch(){const e=this.closest(".cms-content").attr("id"),t=e?{context:e}:{},n=(0,i.loadComponent)("BlockLinkField",t),l=this.data("schema"),s={...this.data("state"),...l.data,hideLabels:!0};let r=this.getReactRoot();r||(r=(0,o.createRoot)(this[0]),this.setReactRoot(r)),r.render(a.default.createElement(n,s))},onunmatch(){const e=this.getReactRoot();e&&(e.unmount(),this.setReactRoot(null))}})}))},42:function(e){e.exports=FieldHolder},648:function(e){e.exports=Injector},595:function(e){e.exports=InsertLinkModal},86:function(e){e.exports=PropTypes},363:function(e){e.exports=React},691:function(e){e.exports=ReactDomClient},127:function(e){e.exports=Reactstrap},820:function(e){e.exports=classnames},754:function(e){e.exports=i18n},311:function(e){e.exports=jQuery}},t={};function n(l){var a=t[l];if(void 0!==a)return a.exports;var o=t[l]={exports:{}};return e[l](o,o.exports,n),o.exports}n(138),n(274)}();