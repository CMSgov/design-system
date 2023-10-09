var that = this;
function __skpm_run(key, context) {
  that.context = context;

  var exports = /******/ (function (modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {};
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports;
        /******/
      }
      /******/ // Create a new module (and put it into the cache)
      /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {},
        /******/
      });
      /******/
      /******/ // Execute the module function
      /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      /******/
      /******/ // Flag the module as loaded
      /******/ module.l = true;
      /******/
      /******/ // Return the exports of the module
      /******/ return module.exports;
      /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/ __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/ __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/ __webpack_require__.d = function (exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, { enumerable: true, get: getter });
        /******/
      }
      /******/
    };
    /******/
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = function (exports) {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/ __webpack_require__.t = function (value, mode) {
      /******/ if (mode & 1) value = __webpack_require__(value);
      /******/ if (mode & 8) return value;
      /******/ if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
      /******/ var ns = Object.create(null);
      /******/ __webpack_require__.r(ns);
      /******/ Object.defineProperty(ns, 'default', { enumerable: true, value: value });
      /******/ if (mode & 2 && typeof value != 'string')
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function (key) {
              return value[key];
            }.bind(null, key)
          );
      /******/ return ns;
      /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = function (module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default'];
            }
          : /******/ function getModuleExports() {
              return module;
            };
      /******/ __webpack_require__.d(getter, 'a', getter);
      /******/ return getter;
      /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/ __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ // __webpack_public_path__
    /******/ __webpack_require__.p = '';
    /******/
    /******/
    /******/ // Load entry module and return exports
    /******/ return __webpack_require__((__webpack_require__.s = './src/json-token-importer.js'));
    /******/
  })(
    /************************************************************************/
    /******/ {
      /***/ '../../../../themes.json':
        /*!****************************************************************!*\
  !*** /Users/patrickwolfert/Projects/design-system/themes.json ***!
  \****************************************************************/
        /*! exports provided: core, cmsgov, healthcare, medicare, default */
        /***/ function (module) {
          module.exports = JSON.parse(
            '{"core":{"displayName":"Core","longName":"Design System","packageName":"design-system","urlNpm":"https://www.npmjs.com/package/@cmsgov/design-system"},"cmsgov":{"displayName":"CMS.gov","longName":"CMS.gov Design System","packageName":"ds-cms-gov","urlNpm":"https://www.npmjs.com/package/@cmsgov/ds-cms-gov"},"healthcare":{"displayName":"HealthCare.gov","longName":"Healthcare.gov Design System","packageName":"ds-healthcare-gov","urlNpm":"https://www.npmjs.com/package/@cmsgov/ds-healthcare-gov"},"medicare":{"displayName":"Medicare.gov","longName":"Medicare.gov Design System","packageName":"ds-medicare-gov","urlNpm":"https://www.npmjs.com/package/@cmsgov/ds-medicare-gov"}}'
          );

          /***/
        },

      /***/ '../../dist/cmsgov-component.tokens.json':
        /*!********************************************************************************************************************!*\
  !*** /Users/patrickwolfert/Projects/design-system/packages/design-system-tokens/dist/cmsgov-component.tokens.json ***!
  \********************************************************************************************************************/
        /*! exports provided: accordion, alert, autocomplete, badge, button, button-alt, button-dark, button-dark-alt, button-solid, button-solid-alt, button-solid-dark, button-solid-dark-alt, button-ghost, button-ghost-alt, button-ghost-dark, button-ghost-dark-alt, choice, day-picker, dialog, drawer, dropdown, filter-chip, form, icon, link, pagination, review, steplist, spinner, table, tabs, text-input, tooltip, typography, usa-banner, vertical-nav, default */
        /***/ function (module) {
          module.exports = JSON.parse(
            '{"accordion":{"__color":"#262626","__background-color":"#e7e9f5","__background-color--hover":"#b6bde0","__border-color":"#f2f2f2","__border-radius":"20px 20px 0 0","__border-width":"1px","-button__color":"#262626","-content__background-color":"#ffffff"},"alert":{"__background-color":"#e7e9f5","__background-color--error":"#fce8ec","__background-color--lightweight":"#ffffff","__background-color--success":"#e7f3e7","__background-color--warn":"#fffce6","__border-left-color":"#0d2499","__border-color--error":"#e31c3d","__border-color--success":"#12890e","__border-color--warn":"#ffe400","__font-color":"#262626","__icon-size":"40px","__padding":"16px","-bar__width":"8px","-link__font-color":"#09196b","-link__font-color--hover":"#07124d","-link__font-color--focus":"#07124d","-link__font-color--active":"#07124d"},"autocomplete":{"__background-color":"#ffffff","__border-color":"#d9d9d9","-item__font-color":"#0d2499","-item__background-color--active":"#0d2499","-item__font-color--active":"#ffffff","-item-message__font-color":"#0d2499"},"badge":{"__background-color":"#f2f2f2","__background-color--alert":"#e31c3d","__background-color--info":"#0d2499","__background-color--success":"#12890e","__background-color--warn":"#ffe400","__font-color":"#262626","__font-color--alert":"#ffffff","__font-color--info":"#ffffff","__font-color--success":"#ffffff","__font-color--warn":"#262626","__border-radius":"4px"},"button":{"__background-color--active":"#e7e9f5","__background-color--disabled":"#f2f2f2","__background-color--hover":"#ffe400","__background-color":"transparent","__border-color--active":"#0d2499","__border-color--disabled":"#d9d9d9","__border-color--hover":"#0d2499","__border-color":"#0d2499","__border-radius":"9999px","__border-width":"2px","__color--active":"#07124d","__color--disabled":"#5a5a5a","__color--hover":"#09196b","__color":"#0d2499","__font-weight":700,"-icon__fill":"currentColor"},"button-alt":{"__background-color--active":"#d9d9d9","__background-color--disabled":"transparent","__background-color--hover":"#ffe400","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__color--active":"#07124d","__color--disabled":"#d9d9d9","__color--hover":"#09196b","__color":"#0d2499"},"button-dark":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#f2f2f2","__color":"#ffffff"},"button-dark-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__color--active":"#7bebac","__color--disabled":"#5a5a5a","__color--hover":"#c6f6db","__color":"#ecfcf3"},"button-solid":{"__background-color--active":"#e7e9f5","__background-color--disabled":"#f2f2f2","__background-color--hover":"#ffe400","__background-color":"#0d2499","__border-color--active":"#0d2499","__border-color--disabled":"#d9d9d9","__border-color--hover":"#0d2499","__border-color":"#0d2499","__color--active":"#0d2499","__color--disabled":"#5a5a5a","__color--hover":"#0d2499","__color":"#ffffff"},"button-solid-alt":{"__background-color--active":"#e7e9f5","__background-color--disabled":"#f2f2f2","__background-color--hover":"#ffe400","__background-color":"#0d2499","__border-color--active":"#0d2499","__border-color--disabled":"#d9d9d9","__border-color--hover":"#0d2499","__border-color":"#0d2499","__color--active":"#0d2499","__color--disabled":"#5a5a5a","__color--hover":"#0d2499","__color":"#ffffff"},"button-solid-dark":{"__background-color--active":"#d9d9d9","__background-color--disabled":"#404040","__background-color--hover":"#f2f2f2","__background-color":"#ffffff","__border-color--active":"#d9d9d9","__border-color--disabled":"#404040","__border-color--hover":"#f2f2f2","__border-color":"#ffffff","__color--active":"#262626","__color--disabled":"#262626","__color--hover":"#262626","__color":"#262626"},"button-solid-dark-alt":{"__background-color--active":"#42e288","__background-color--disabled":"#404040","__background-color--hover":"#7bebac","__background-color":"#c6f6db","__border-color--active":"#42e288","__border-color--disabled":"#404040","__border-color--hover":"#7bebac","__border-color":"#c6f6db","__color--active":"#262626","__color--disabled":"#262626","__color--hover":"#262626","__color":"#262626"},"button-ghost":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"#ffe400","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#0d2499","__color--disabled":"#5a5a5a","__color--hover":"#0d2499","__color":"#0d2499"},"button-ghost-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"#ffe400","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#0d2499","__color--disabled":"#5a5a5a","__color--hover":"#0d2499","__color":"#0d2499"},"button-ghost-dark":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#f2f2f2","__color":"#ffffff"},"button-ghost-dark-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#42e288","__color--disabled":"#5a5a5a","__color--hover":"#7bebac","__color":"#c6f6db"},"choice":{"__background-color":"#ffffff","__background-color--checked":"#0d2499","__background-color--disabled":"#d9d9d9","__background-color--inverse":"#ffffff00","__background-color--disabled--inverse":"#e9ecf126","__border-color":"#262626","__border-color--checked":"#0d2499","__border-color--disabled":"#a6a6a6","__border-color--error":"#262626","__border-color--error--inverse":"#ffffff","__border-color--inverse":"#ffffff","__border-color--left":"#0d2499","__border-color--focus":"#09196b","__border-color--disabled--inverse":"#a6a6a6","__border-radius":"0px","__border-width":"2px","__color--unchecked":"#ffffff","__color--disabled":"#5a5a5a","__size":"32px","__size--small":"20px","__size-radio":"22px","__size-radio--small":"12px","-label__color--disabled":"#5a5a5a","-label__color--disabled--inverse":"#e9ecf1"},"day-picker":{"-button__background-color--hover":"#e7e9f5"},"dialog":{"__background-color":"#ffffff","__padding":"32px","-overlay__background-color":"#00000080","-icon__size":"0.8125rem"},"drawer":{"__animation-timing":"0.3s","__background-color":"#ffffff","__border-color":"#d9d9d9","-close__color":"#000000","-header__background-color":"#f2f2f2","-footer__background-color":"#e7e9f5","-toggle__background-color--hover":"#0d2499","-toggle__color--hover":"#ffffff","-toggle__background-color--hover--inverse":"#ffffff","-toggle__color--hover--inverse":"#404040"},"dropdown":{"__background-color":"#ffffff","-option-group__padding":"24px"},"filter-chip":{"__border-radius":"9999px","__background-color":"#e7e9f5","__border-color":"#0d2499","__color":"#262626","__background-color--active":"#0d2499","__border-color--active":"#0d2499","__color--active":"#ffffff","-icon__color":"#262626","-icon__color-active":"#ffffff","-icon__container-size":"18px"},"form":{"-label__color--inverse":"#ffffff","__max-width":"460px","__max-width--small":"6em","__max-width--medium":"12em","-hint__color":"#5a5a5a","-hint__color--inverse":"#e9ecf1","-error__color":"#e31c3d","-error__color--inverse":"#f18e9e"},"icon":{"__color--error":"#e31c3d","__color--inverse":"#ffffff","__color--primary":"#0d2499","__color--success":"#12890e","__color--warn":"#ffe400"},"link":{"__color":"#0d2499","__color--active":"#262626","__color--hover":"#0d2499","__color--visited":"#4c2c92","-inverse__color":"#ffffff","-inverse__color--active":"#e9ecf1","-inverse__color--hover":"#e9ecf1","-inverse__color--visited":"#e9ecf1","__text-decoration-offset":"4px","__text-decoration-thickness":"2.4px","__text-decoration-thickness--hover":"2.4px"},"pagination":{"-link__color":"#0d2499","-link__color--hover":"#09196b","-link__color--active":"#07124d","-link__color--focus":"#09196b","-link__color--disabled":"#d9d9d9","-current-page__color":"#262626","-overflow__color":"#5a5a5a","-page-count__color":"#5a5a5a"},"review":{"__border-color":"#d9d9d9"},"steplist":{"__color":"#5a5a5a","__color--current":"#0d2499","__background-color--current":"#0d2499","-step__color":"#5a5a5a","-step__border-color":"#d9d9d9","-step__border-color--default":"#5a5a5a","-step__color--current":"#ffffff","-step__color--completed":"#262626","-step__background-color--completed":"#262626"},"spinner":{"__background-color":"#ffffff","__color":"#262626","__background-color--inverse":"#07124d","__color--inverse":"#ffffff"},"table":{"__padding":"16px","__border-color":"#d9d9d9","-header__background-color":"#e7e9f5","-striped__background-color":"#f2f2f2","-striped-header__background-color":"#f2f2f2"},"tabs":{"__border-color":"#d9d9d9","__background-color":"#ffffff","__background-color--hover":"#e7e9f5","__background-color--disabled":"#d9d9d9","__background-color--selected":"#ffffff","__color":"#262626","__color--hover":"#0d2499","__color--active":"#09196b","__color--disabled":"#404040","__color--selected":"#0d2499","__border-color--disabled":"#d9d9d9","__border-color--selected":"#0d2499","-panel__background-color":"#ffffff"},"text-input":{"__line-height":"1.3","__background-color--disabled":"#d9d9d9","__border-width":"2px","__border-width--error":"3px","__border-color":"#262626","__border-color--disabled":"#a6a6a6","__border-color--error":"#e31c3d","__border-color--error--inverse":"#f18e9e","__border-color--inverse":"#000000","__color":"#262626","__divider-color":"#a6a6a6","__padding":"8px","__border-radius":"3px"},"tooltip":{"__background-color":"#ffffff","__border-color":"#404040","__border-color--active":"#0d249940","__border-color--inverse-active":"#ffffff40","__border-width":"1px","__color":"#262626","__box-shadow-color":"#a6a6a6","-icon__color":"#0d2499","-icon__color--inverse":"#ffffff","-trigger__color":"#0d2499"},"typography":{"-heading__font-family":"inherit","-heading__font-weight":700,"-heading-4xl__font-weight":"inherit","-heading-3xl__font-weight":"inherit","-heading-lg__font-weight":700,"-heading-md__font-weight":700,"-heading-sm__font-weight":400,"-body__font-family":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif"},"usa-banner":{"__background-color":"#f2f2f2","__color":"#262626","__max-width":"1104px","-gutter-width":"32px","-heading__font-family":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","-heading__line-height":"1.1","-heading__font-size":".875rem","-panel__font-family":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","-panel__line-height":1.5,"-panel__font-size":"1rem","-link__color":"#0d2499","-domain-icon__color":"#0d2499","-security-icon__color":"#59ac56","-close-button__background-color--mobile":"#d9d9d9","-close-button__color--mobile":"#0d2499"},"vertical-nav":{"-item__background-color--hover":"#f2f2f2","-item__color--hover":"#0d2499","-item__border-color":"#5a5a5a","-label__color":"#262626","-label-icon__color":"#262626","-label__border-color--current":"#0d2499","-label__color--current":"#0d2499"}}'
          );

          /***/
        },

      /***/ '../../dist/cmsgov.tokens.json':
        /*!**********************************************************************************************************!*\
  !*** /Users/patrickwolfert/Projects/design-system/packages/design-system-tokens/dist/cmsgov.tokens.json ***!
  \**********************************************************************************************************/
        /*! exports provided: animation, color, font, global, measure, media, radius, shadow, spacer, z, default */
        /***/ function (module) {
          module.exports = JSON.parse(
            '{"animation":{"ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","speed-base":1,"speed-1":"0.25s","speed-2":"0.3s","speed-3":"0.5s","speed-4":"0.8s"},"color":{"white":"#ffffff","black":"#000000","transparent":"#ffffff00","transparent-black-alpha50":"#00000080","transparent-black-alpha25":"#00000040","transparent-white-alpha50":"#ffffff80","transparent-white-alpha25":"#ffffff40","background":"#ffffff","background-dialog":"#ffffff","background-dialog-mask":"#00000080","background-inverse":"#07124d","base":"#262626","base-inverse":"#ffffff","border":"#d9d9d9","border-dark":"#0f1e38","border-inverse":"#ffffff","error-lightest":"#fce8ec","error-lighter":"#f7bbc5","error-light":"#f18e9e","error":"#e31c3d","error-dark":"#cc1937","error-darker":"#9f142b","error-darkest":"#720e1f","focus-light":"#ffffff","focus-dark":"#bd13b8","gray-lightest":"#f2f2f2","gray-lighter":"#d9d9d9","gray-light":"#a6a6a6","gray":"#808080","gray-dark":"#5a5a5a","gray-darker":"#404040","gray-darkest":"#262626","muted":"#5a5a5a","muted-inverse":"#e9ecf1","primary-lightest":"#e7e9f5","primary-lighter":"#b6bde0","primary-light":"#5666b8","primary":"#0d2499","primary-dark":"#0c208a","primary-darker":"#09196b","primary-darkest":"#07124d","secondary-lightest":"#ecfcf3","secondary-lighter":"#c6f6db","secondary-light":"#7bebac","secondary":"#42e288","secondary-dark":"#3bcb7a","secondary-darker":"#2e9e5f","secondary-darkest":"#217144","accent-primary-lightest":"#fffce6","accent-primary-lighter":"#fff7b5","accent-primary-light":"#ffec52","accent-primary":"#ffe400","accent-primary-dark":"#e6cd07","accent-primary-darker":"#b3a006","accent-primary-darkest":"#807204","info-lightest":"#e7e9f5","info-lighter":"#b6bde0","info-light":"#5666b8","info":"#0d2499","info-dark":"#0c208a","info-darker":"#09196b","info-darkest":"#07124d","success-lightest":"#e7f3e7","success-lighter":"#b8dcb7","success-light":"#59ac56","success":"#12890e","success-dark":"#107b0d","success-darker":"#0d600a","success-darkest":"#094507","warn-lightest":"#fffce6","warn-lighter":"#fff7b5","warn-light":"#ffec52","warn":"#ffe400","warn-dark":"#e6cd07","warn-darker":"#b3a006","warn-darkest":"#807204","visited":"#4c2c92"},"font":{"sans":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","serif":"Bitter, Superclarendon, \'Bookman Old Style\', \'URW Bookman\', \'URW Bookman L\', \'Georgia Pro\', Georgia, serif","family-open-sans":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","family-rubik":"Rubik, Seravek, \'Gill Sans Nova\', Ubuntu, Calibri, \'DejaVu Sans\', source-sans-pro, sans-serif","family-montserrat":"Montserrat, Avenir, Corbel, \'URW Gothic\', source-sans-pro, sans-serif","family-bitter":"Bitter, Superclarendon, \'Bookman Old Style\', \'URW Bookman\', \'URW Bookman L\', \'Georgia Pro\', Georgia, serif","line-height-reset":1,"line-height-heading":1.3,"line-height-base":1.5,"line-height-lead":1.7,"size-base":"1rem","size-sm":".875rem","size-md":"1rem","size-lg":"1.125rem","size-xl":"1.3125rem","size-2xl":"1.5rem","size-3xl":"2.25rem","size-4xl":"3rem","size-5xl":"3.75rem","weight-light":300,"weight-normal":400,"weight-semibold":600,"weight-bold":700},"global":{"article-max-width":"600px","grid-columns":"12","grid-gutter-width":"32px","grid-form-gutter-width":"16px","lead-max-width":"77rem","nav-width":"951px","site-margins":"3rem","site-margins-mobile":"1.5rem","site-max-width":"1104px","text-max-width":"53rem"},"measure":{"narrow":"45ex","base":"65ex","wide":"80ex"},"media":{"width-xs":"0px","width-sm":"544px","width-md":"768px","width-lg":"1024px","width-xl":"1280px"},"radius":{"circle":"100%","default":"3px","large":"8px","medium":"4px","pill":"9999px","small":"2px"},"shadow":{"focus":"inset 0 0 0 1px #262626","focus-inverse":"inset 0 0 0 1px #262626","focus-link":"0 3px #262626","base-offset-x":"2px","base-offset-y":"2px","base-blur-radius":"4px","base-color":"#00000040","base":"2px 2px 4px"},"spacer":{"1":"8px","2":"16px","3":"24px","4":"32px","5":"40px","6":"48px","7":"56px","none":"0px","half":"4px"},"z":{"deep":-99999,"default":1,"drawer":500,"dialog":1000,"popup":6000,"spinner":9050}}'
          );

          /***/
        },

      /***/ '../../dist/core-component.tokens.json':
        /*!******************************************************************************************************************!*\
  !*** /Users/patrickwolfert/Projects/design-system/packages/design-system-tokens/dist/core-component.tokens.json ***!
  \******************************************************************************************************************/
        /*! exports provided: accordion, alert, autocomplete, badge, button, button-alt, button-dark, button-dark-alt, button-solid, button-solid-alt, button-solid-dark, button-solid-dark-alt, button-ghost, button-ghost-alt, button-ghost-dark, button-ghost-dark-alt, choice, day-picker, dialog, drawer, dropdown, filter-chip, form, icon, link, pagination, review, steplist, spinner, table, tabs, text-input, tooltip, typography, usa-banner, vertical-nav, default */
        /***/ function (module) {
          module.exports = JSON.parse(
            '{"accordion":{"__color":"#262626","__background-color":"#f2f2f2","__background-color--hover":"#d9d9d9","__border-color":"#f2f2f2","__border-radius":0,"__border-width":"4px","-button__color":"#262626","-content__background-color":"#ffffff"},"alert":{"__background-color":"#e6f9fd","__background-color--error":"#fce8ec","__background-color--lightweight":"#ffffff","__background-color--success":"#e7f3e7","__background-color--warn":"#fef9e9","__border-left-color":"#02bfe7","__border-color--error":"#e31c3d","__border-color--success":"#12890e","__border-color--warn":"#f8c41f","__font-color":"#262626","__icon-size":"40px","__padding":"16px","-bar__width":"8px","-link__font-color":"#004f84","-link__font-color--hover":"#00395e","-link__font-color--focus":"#00395e","-link__font-color--active":"#00395e"},"autocomplete":{"__background-color":"#ffffff","__border-color":"#d9d9d9","-item__font-color":"#0071bc","-item__background-color--active":"#00395e","-item__font-color--active":"#ffffff","-item-message__font-color":"#5a5a5a"},"badge":{"__background-color":"#5a5a5a","__background-color--alert":"#e31c3d","__background-color--info":"#0071bc","__background-color--success":"#12890e","__background-color--warn":"#f8c41f","__font-color":"#ffffff","__font-color--alert":"#ffffff","__font-color--info":"#ffffff","__font-color--success":"#ffffff","__font-color--warn":"#262626","__border-radius":"9999px"},"button":{"__background-color--active":"#d9d9d9","__background-color--disabled":"transparent","__background-color--hover":"#f2f2f2","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__border-radius":"3px","__border-width":"1px","__color--active":"#00395e","__color--disabled":"#d9d9d9","__color--hover":"#004f84","__color":"#0071bc","__font-weight":700,"-icon__fill":"currentColor"},"button-alt":{"__background-color--active":"#d9d9d9","__background-color--disabled":"transparent","__background-color--hover":"#f2f2f2","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__color--active":"#094507","__color--disabled":"#d9d9d9","__color--hover":"#0d600a","__color":"#12890e"},"button-dark":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#ffffff","__color":"#f2f2f2"},"button-dark-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__color--active":"#59ac56","__color--disabled":"#5a5a5a","__color--hover":"#e7f3e7","__color":"#b8dcb7"},"button-solid":{"__background-color--active":"#00395e","__background-color--disabled":"#d9d9d9","__background-color--hover":"#004f84","__background-color":"#0071bc","__border-color--active":"#00395e","__border-color--disabled":"#d9d9d9","__border-color--hover":"#004f84","__border-color":"#0071bc","__color--active":"#ffffff","__color--disabled":"#404040","__color--hover":"#ffffff","__color":"#ffffff"},"button-solid-alt":{"__background-color--active":"#094507","__background-color--disabled":"#d9d9d9","__background-color--hover":"#0d600a","__background-color":"#12890e","__border-color--active":"#094507","__border-color--disabled":"#d9d9d9","__border-color--hover":"#0d600a","__border-color":"#12890e","__color--active":"#ffffff","__color--disabled":"#404040","__color--hover":"#ffffff","__color":"#ffffff"},"button-solid-dark":{"__background-color--active":"#d9d9d9","__background-color--disabled":"#404040","__background-color--hover":"#ffffff","__background-color":"#f2f2f2","__border-color--active":"#d9d9d9","__border-color--disabled":"#404040","__border-color--hover":"#ffffff","__border-color":"#f2f2f2","__color--active":"#262626","__color--disabled":"#262626","__color--hover":"#262626","__color":"#262626"},"button-solid-dark-alt":{"__background-color--active":"#12890e","__background-color--disabled":"#404040","__background-color--hover":"#e7f3e7","__background-color":"#b8dcb7","__border-color--active":"#12890e","__border-color--disabled":"#404040","__border-color--hover":"#e7f3e7","__border-color":"#b8dcb7","__color--active":"#262626","__color--disabled":"#262626","__color--hover":"#262626","__color":"#262626"},"button-ghost":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#00395e","__color--disabled":"#d9d9d9","__color--hover":"#004f84","__color":"#0071bc"},"button-ghost-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#094507","__color--disabled":"#d9d9d9","__color--hover":"#0d600a","__color":"#12890e"},"button-ghost-dark":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#ffffff","__color":"#f2f2f2"},"button-ghost-dark-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#12890e","__color--disabled":"#5a5a5a","__color--hover":"#e7f3e7","__color":"#b8dcb7"},"choice":{"__background-color":"#ffffff","__background-color--checked":"#0071bc","__background-color--disabled":"#d9d9d9","__background-color--inverse":"#ffffff00","__background-color--disabled--inverse":"#e9ecf126","__border-color":"#262626","__border-color--checked":"#0071bc","__border-color--disabled":"#a6a6a6","__border-color--error":"#262626","__border-color--error--inverse":"#ffffff","__border-color--inverse":"#ffffff","__border-color--left":"#0071bc","__border-color--focus":"#004f84","__border-color--disabled--inverse":"#a6a6a6","__border-radius":"0px","__border-width":"2px","__color--unchecked":"#ffffff","__color--disabled":"#5a5a5a","__size":"32px","__size--small":"20px","__size-radio":"22px","__size-radio--small":"12px","-label__color--disabled":"#5a5a5a","-label__color--disabled--inverse":"#e9ecf1"},"day-picker":{"-button__background-color--hover":"#e6f1f8"},"dialog":{"__background-color":"#ffffff","__padding":"32px","-overlay__background-color":"#00000080","-icon__size":"0.8125rem"},"drawer":{"__animation-timing":"0.3s","__background-color":"#ffffff","__border-color":"#d9d9d9","-close__color":"#000000","-header__background-color":"#f2f2f2","-footer__background-color":"#e6f9fd","-toggle__background-color--hover":"#02bfe7","-toggle__color--hover":"#ffffff","-toggle__background-color--hover--inverse":"#ffffff","-toggle__color--hover--inverse":"#404040"},"dropdown":{"__background-color":"#ffffff","-option-group__padding":"24px"},"filter-chip":{"__border-radius":"9999px","__background-color":"#e6f1f8","__border-color":"#0071bc","__color":"#262626","__background-color--active":"#0071bc","__border-color--active":"#0071bc","__color--active":"#ffffff","-icon__color":"#262626","-icon__color-active":"#ffffff","-icon__container-size":"18px"},"form":{"-label__color--inverse":"#ffffff","__max-width":"460px","__max-width--small":"6em","__max-width--medium":"12em","-hint__color":"#5a5a5a","-hint__color--inverse":"#e9ecf1","-error__color":"#e31c3d","-error__color--inverse":"#f7bbc5"},"icon":{"__color--error":"#e31c3d","__color--inverse":"#ffffff","__color--primary":"#0071bc","__color--success":"#12890e","__color--warn":"#f8c41f"},"link":{"__color":"#0071bc","__color--active":"#00395e","__color--hover":"#004f84","__color--visited":"#4c2c92","-inverse__color":"#ffffff","-inverse__color--active":"#e9ecf1","-inverse__color--hover":"#e9ecf1","-inverse__color--visited":"#e9ecf1","__text-decoration-offset":"auto","__text-decoration-thickness":"1px","__text-decoration-thickness--hover":"1px"},"pagination":{"-link__color":"#0071bc","-link__color--hover":"#004f84","-link__color--active":"#00395e","-link__color--focus":"#004f84","-link__color--disabled":"#d9d9d9","-current-page__color":"#262626","-overflow__color":"#5a5a5a","-page-count__color":"#5a5a5a"},"review":{"__border-color":"#d9d9d9"},"steplist":{"__color":"#5a5a5a","__color--current":"#0071bc","__background-color--current":"#0071bc","-step__color":"#5a5a5a","-step__border-color":"#d9d9d9","-step__border-color--default":"#5a5a5a","-step__color--current":"#ffffff","-step__color--completed":"#262626","-step__background-color--completed":"#262626"},"spinner":{"__background-color":"#ffffff","__color":"#262626","__background-color--inverse":"#00395e","__color--inverse":"#ffffff"},"table":{"__padding":"16px","__border-color":"#000000","-header__background-color":"#f2f2f2","-striped__background-color":"#f2f2f2","-striped-header__background-color":"#f2f2f2"},"tabs":{"__border-color":"#d9d9d9","__background-color":"#ffffff","__background-color--hover":"#ffffff","__background-color--disabled":"#d9d9d9","__background-color--selected":"#ffffff","__color":"#262626","__color--hover":"#0071bc","__color--active":"#004f84","__color--disabled":"#404040","__color--selected":"#0071bc","__border-color--disabled":"#d9d9d9","__border-color--selected":"#0071bc","-panel__background-color":"#ffffff"},"text-input":{"__line-height":"1.3","__background-color--disabled":"#d9d9d9","__border-width":"2px","__border-width--error":"3px","__border-color":"#262626","__border-color--disabled":"#a6a6a6","__border-color--error":"#e31c3d","__border-color--error--inverse":"#f7bbc5","__border-color--inverse":"#000000","__color":"#262626","__divider-color":"#a6a6a6","__padding":"8px","__border-radius":"3px"},"tooltip":{"__background-color":"#ffffff","__border-color":"#404040","__border-color--active":"#0071bc40","__border-color--inverse-active":"#ffffff40","__border-width":"1px","__color":"#262626","__box-shadow-color":"#a6a6a6","-icon__color":"#0071bc","-icon__color--inverse":"#ffffff","-trigger__color":"#0071bc"},"typography":{"-heading__font-family":"inherit","-heading__font-weight":700,"-heading-4xl__font-weight":"inherit","-heading-3xl__font-weight":"inherit","-heading-lg__font-weight":700,"-heading-md__font-weight":700,"-heading-sm__font-weight":400,"-body__font-family":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif"},"usa-banner":{"__background-color":"#f2f2f2","__color":"#262626","__max-width":"1104px","-gutter-width":"32px","-heading__font-family":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","-heading__line-height":"1.1","-heading__font-size":".875rem","-panel__font-family":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","-panel__line-height":1.5,"-panel__font-size":"1rem","-link__color":"#0071bc","-domain-icon__color":"#0071bc","-security-icon__color":"#59ac56","-close-button__background-color--mobile":"#d9d9d9","-close-button__color--mobile":"#0071bc"},"vertical-nav":{"-item__background-color--hover":"#f2f2f2","-item__color--hover":"#0071bc","-item__border-color":"#5a5a5a","-label__color":"#262626","-label-icon__color":"#262626","-label__border-color--current":"#0071bc","-label__color--current":"#0071bc"}}'
          );

          /***/
        },

      /***/ '../../dist/core.tokens.json':
        /*!********************************************************************************************************!*\
  !*** /Users/patrickwolfert/Projects/design-system/packages/design-system-tokens/dist/core.tokens.json ***!
  \********************************************************************************************************/
        /*! exports provided: animation, color, font, global, measure, media, radius, shadow, spacer, z, default */
        /***/ function (module) {
          module.exports = JSON.parse(
            '{"animation":{"ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","speed-base":1,"speed-1":"0.25s","speed-2":"0.3s","speed-3":"0.5s","speed-4":"0.8s"},"color":{"white":"#ffffff","black":"#000000","transparent":"#ffffff00","transparent-black-alpha50":"#00000080","transparent-black-alpha25":"#00000040","transparent-white-alpha50":"#ffffff80","transparent-white-alpha25":"#ffffff40","background":"#ffffff","background-dialog":"#ffffff","background-dialog-mask":"#00000080","background-inverse":"#00395e","base":"#262626","base-inverse":"#ffffff","border":"#d9d9d9","border-dark":"#0f1e38","border-inverse":"#ffffff","error-lightest":"#fce8ec","error-lighter":"#f7bbc5","error-light":"#eb6077","error":"#e31c3d","error-dark":"#cc1937","error-darker":"#9f142b","error-darkest":"#720e1f","focus-light":"#ffffff","focus-dark":"#bd13b8","gray-lightest":"#f2f2f2","gray-lighter":"#d9d9d9","gray-light":"#a6a6a6","gray":"#808080","gray-dark":"#5a5a5a","gray-darker":"#404040","gray-darkest":"#262626","muted":"#5a5a5a","muted-inverse":"#e9ecf1","primary-lightest":"#e6f1f8","primary-lighter":"#b3d4eb","primary-light":"#4d9cd0","primary":"#0071bc","primary-dark":"#0066a9","primary-darker":"#004f84","primary-darkest":"#00395e","secondary-lightest":"#e7f3e7","secondary-lighter":"#b8dcb7","secondary-light":"#59ac56","secondary":"#12890e","secondary-dark":"#107b0d","secondary-darker":"#0d600a","secondary-darkest":"#094507","accent-primary-lightest":"#fcebe6","accent-primary-lighter":"#f5c3b3","accent-primary-light":"#e7724f","accent-primary":"#dd3603","accent-primary-dark":"#c73103","accent-primary-darker":"#9b2602","accent-primary-darkest":"#6f1b02","info-lightest":"#e6f9fd","info-lighter":"#b3ecf8","info-light":"#4ed2ee","info":"#02bfe7","info-dark":"#02acd0","info-darker":"#0186a2","info-darkest":"#016074","success-lightest":"#e7f3e7","success-lighter":"#b8dcb7","success-light":"#59ac56","success":"#12890e","success-dark":"#107b0d","success-darker":"#0d600a","success-darkest":"#094507","warn-lightest":"#fef9e9","warn-lighter":"#fdedbc","warn-light":"#fad662","warn":"#f8c41f","warn-dark":"#dfb01c","warn-darker":"#ae8916","warn-darkest":"#7c6210","visited":"#4c2c92"},"font":{"sans":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","serif":"Bitter, Superclarendon, \'Bookman Old Style\', \'URW Bookman\', \'URW Bookman L\', \'Georgia Pro\', Georgia, serif","family-open-sans":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","family-rubik":"Rubik, Seravek, \'Gill Sans Nova\', Ubuntu, Calibri, \'DejaVu Sans\', source-sans-pro, sans-serif","family-montserrat":"Montserrat, Avenir, Corbel, \'URW Gothic\', source-sans-pro, sans-serif","family-bitter":"Bitter, Superclarendon, \'Bookman Old Style\', \'URW Bookman\', \'URW Bookman L\', \'Georgia Pro\', Georgia, serif","line-height-reset":1,"line-height-heading":1.3,"line-height-base":1.5,"line-height-lead":1.7,"size-base":"1rem","size-sm":".875rem","size-md":"1rem","size-lg":"1.125rem","size-xl":"1.3125rem","size-2xl":"1.5rem","size-3xl":"2.25rem","size-4xl":"3rem","size-5xl":"3.75rem","weight-light":300,"weight-normal":400,"weight-semibold":600,"weight-bold":700},"global":{"article-max-width":"600px","grid-columns":"12","grid-gutter-width":"32px","grid-form-gutter-width":"16px","lead-max-width":"77rem","nav-width":"951px","site-margins":"3rem","site-margins-mobile":"1.5rem","site-max-width":"1104px","text-max-width":"53rem"},"measure":{"narrow":"45ex","base":"65ex","wide":"80ex"},"media":{"width-xs":"0px","width-sm":"544px","width-md":"768px","width-lg":"1024px","width-xl":"1280px"},"radius":{"circle":"100%","default":"3px","large":"8px","medium":"4px","pill":"9999px","small":"2px"},"shadow":{"focus":"inset 0 0 0 1px #262626","focus-inverse":"inset 0 0 0 1px #262626","focus-link":"0 3px #262626","base-offset-x":"2px","base-offset-y":"2px","base-blur-radius":"4px","base-color":"#00000040","base":"2px 2px 4px"},"spacer":{"1":"8px","2":"16px","3":"24px","4":"32px","5":"40px","6":"48px","7":"56px","none":"0px","half":"4px"},"z":{"deep":-99999,"default":1,"drawer":500,"dialog":1000,"popup":6000,"spinner":9050}}'
          );

          /***/
        },

      /***/ '../../dist/healthcare-component.tokens.json':
        /*!************************************************************************************************************************!*\
  !*** /Users/patrickwolfert/Projects/design-system/packages/design-system-tokens/dist/healthcare-component.tokens.json ***!
  \************************************************************************************************************************/
        /*! exports provided: accordion, alert, autocomplete, badge, button, button-alt, button-dark, button-dark-alt, button-solid, button-solid-alt, button-solid-dark, button-solid-dark-alt, button-ghost, button-ghost-alt, button-ghost-dark, button-ghost-dark-alt, choice, day-picker, dialog, drawer, dropdown, filter-chip, footer, form, icon, inset, link, pagination, review, steplist, spinner, table, tabs, text-input, tooltip, typography, usa-banner, vertical-nav, default */
        /***/ function (module) {
          module.exports = JSON.parse(
            '{"accordion":{"__color":"#262626","__background-color":"#ffffff00","__background-color--hover":"#ffffff00","__border-color":"#ffffff00","__border-radius":0,"__border-width":"4px","-button__color":"#046791","-content__background-color":"#ffffff00","-icon__size":"0.875rem"},"alert":{"__background-color":"#ecf4fa","__background-color--error":"#fce8ec","__background-color--lightweight":"#ffffff","__background-color--success":"#e7f3e7","__background-color--warn":"#fef9e9","__border-left-color":"#3e94cf","__border-color--error":"#e31c3d","__border-color--success":"#12890e","__border-color--warn":"#f8c41f","__font-color":"#262626","__icon-size":"40px","__padding":"16px","-bar__width":"8px","-link__font-color":"#034866","-link__font-color--hover":"#023449","-link__font-color--focus":"#023449","-link__font-color--active":"#023449"},"autocomplete":{"__background-color":"#ffffff","__border-color":"#d9d9d9","-item__font-color":"#046791","-item__background-color--active":"#023449","-item__font-color--active":"#ffffff","-item-message__font-color":"#5a5a5a"},"badge":{"__background-color":"#5a5a5a","__background-color--alert":"#e31c3d","__background-color--info":"#046791","__background-color--success":"#12890e","__background-color--warn":"#f8c41f","__font-color":"#ffffff","__font-color--alert":"#ffffff","__font-color--info":"#ffffff","__font-color--success":"#ffffff","__font-color--warn":"#262626","__border-radius":"9999px"},"button":{"__background-color--active":"#023449","__background-color--disabled":"#ffffff","__background-color--hover":"#046791","__background-color":"#ffffff","__border-color--active":"#023449","__border-color--disabled":"currentColor","__border-color--hover":"#046791","__border-color":"currentColor","__border-radius":"3px","__border-width":"2px","__color--active":"#ffffff","__color--disabled":"#d9d9d9","__color--hover":"#ffffff","__color":"#046791","__font-weight":700,"-icon__fill":"currentColor"},"button-alt":{"__background-color--active":"#023449","__background-color--disabled":"#ffffff","__background-color--hover":"#046791","__background-color":"#ffffff","__border-color--active":"#023449","__border-color--disabled":"currentColor","__border-color--hover":"#046791","__border-color":"currentColor","__color--active":"#ffffff","__color--disabled":"#d9d9d9","__color--hover":"#ffffff","__color":"#046791"},"button-dark":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#f2f2f2","__color":"#ffffff"},"button-dark-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#f2f2f2","__color":"#ffffff"},"button-solid":{"__background-color--active":"#094507","__background-color--disabled":"#d9d9d9","__background-color--hover":"#0d600a","__background-color":"#12890e","__border-color--active":"#094507","__border-color--disabled":"#d9d9d9","__border-color--hover":"#0d600a","__border-color":"#12890e","__color--active":"#ffffff","__color--disabled":"#404040","__color--hover":"#ffffff","__color":"#ffffff"},"button-solid-alt":{"__background-color--active":"#023449","__background-color--disabled":"#d9d9d9","__background-color--hover":"#034866","__background-color":"#046791","__border-color--active":"#023449","__border-color--disabled":"#d9d9d9","__border-color--hover":"#034866","__border-color":"#046791","__color--active":"#ffffff","__color--disabled":"#404040","__color--hover":"#ffffff","__color":"#ffffff"},"button-solid-dark":{"__background-color--active":"#d9d9d9","__background-color--disabled":"#404040","__background-color--hover":"#f2f2f2","__background-color":"#ffffff","__border-color--active":"#d9d9d9","__border-color--disabled":"#404040","__border-color--hover":"#f2f2f2","__border-color":"#ffffff","__color--active":"#262626","__color--disabled":"#262626","__color--hover":"#262626","__color":"#262626"},"button-solid-dark-alt":{"__background-color--active":"#046791","__background-color--disabled":"#404040","__background-color--hover":"#4f95b2","__background-color":"#b4d1de","__border-color--active":"#046791","__border-color--disabled":"#404040","__border-color--hover":"#4f95b2","__border-color":"#b4d1de","__color--active":"#262626","__color--disabled":"#262626","__color--hover":"#262626","__color":"#262626"},"button-ghost":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#023449","__color--disabled":"#d9d9d9","__color--hover":"#034866","__color":"#046791"},"button-ghost-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#023449","__color--disabled":"#d9d9d9","__color--hover":"#034866","__color":"#046791"},"button-ghost-dark":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#f2f2f2","__color":"#ffffff"},"button-ghost-dark-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#f2f2f2","__color":"#ffffff"},"choice":{"__background-color":"#ffffff","__background-color--checked":"#046791","__background-color--disabled":"#d9d9d9","__background-color--inverse":"#ffffff00","__background-color--disabled--inverse":"#e9ecf126","__border-color":"#262626","__border-color--checked":"#046791","__border-color--disabled":"#a6a6a6","__border-color--error":"#e31c3d","__border-color--error--inverse":"#eb6077","__border-color--inverse":"#ffffff","__border-color--left":"#046791","__border-color--focus":"#034866","__border-color--disabled--inverse":"#a6a6a6","__border-radius":"0px","__border-width":"2px","__color--unchecked":"#ffffff","__color--disabled":"#5a5a5a","__size":"32px","__size--small":"20px","__size-radio":"22px","__size-radio--small":"12px","-label__color--disabled":"#5a5a5a","-label__color--disabled--inverse":"#e9ecf1"},"day-picker":{"-button__background-color--hover":"#e6f0f4"},"dialog":{"__background-color":"#ffffff","__padding":"32px","-overlay__background-color":"#00000080","-icon__size":"0.8125rem"},"drawer":{"__animation-timing":"0.3s","__background-color":"#ffffff","__border-color":"#d9d9d9","-close__color":"#000000","-header__background-color":"#f2f2f2","-footer__background-color":"#ecf4fa","-toggle__background-color--hover":"#3e94cf","-toggle__color--hover":"#ffffff","-toggle__background-color--hover--inverse":"#ffffff","-toggle__color--hover--inverse":"#404040"},"dropdown":{"__background-color":"#ffffff","-option-group__padding":"24px"},"filter-chip":{"__border-radius":"9999px","__background-color":"#e6f0f4","__border-color":"#046791","__color":"#262626","__background-color--active":"#046791","__border-color--active":"#046791","__color--active":"#ffffff","-icon__color":"#262626","-icon__color-active":"#ffffff","-icon__container-size":"18px"},"footer":{"__list-marker-size":"2px"},"form":{"__max-width":"460px","__max-width--small":"6em","__max-width--medium":"12em","-label__color--inverse":"#ffffff","-hint__color":"#5a5a5a","-hint__color--inverse":"#e9ecf1","-error__color":"#e31c3d","-error__color--inverse":"#f7bbc5"},"icon":{"__color--error":"#e31c3d","__color--inverse":"#ffffff","__color--primary":"#046791","__color--success":"#12890e","__color--warn":"#f8c41f"},"inset":{"__border-width":"4px"},"link":{"__color":"#046791","__color--active":"#023449","__color--hover":"#034866","__color--visited":"#4c2c92","-inverse__color":"#ffffff","-inverse__color--active":"#e9ecf1","-inverse__color--hover":"#e9ecf1","-inverse__color--visited":"#e9ecf1","__text-decoration-offset":"auto","__text-decoration-thickness":"1px","__text-decoration-thickness--hover":"1px"},"pagination":{"-link__color":"#046791","-link__color--hover":"#034866","-link__color--active":"#023449","-link__color--focus":"#034866","-link__color--disabled":"#d9d9d9","-current-page__color":"#262626","-overflow__color":"#5a5a5a","-page-count__color":"#5a5a5a"},"review":{"__border-color":"#d9d9d9"},"steplist":{"__color":"#5a5a5a","__color--current":"#046791","__background-color--current":"#046791","-step__color":"#5a5a5a","-step__border-color":"#d9d9d9","-step__border-color--default":"#5a5a5a","-step__color--current":"#ffffff","-step__color--completed":"#262626","-step__background-color--completed":"#262626"},"spinner":{"__background-color":"#ffffff","__color":"#262626","__background-color--inverse":"#00395e","__color--inverse":"#ffffff"},"table":{"__padding":"16px","__border-color":"#000000","-header__background-color":"#f2f2f2","-striped__background-color":"#f2f2f2","-striped-header__background-color":"#f2f2f2"},"tabs":{"__border-color":"#d9d9d9","__background-color":"#ffffff","__background-color--hover":"#ffffff","__background-color--disabled":"#d9d9d9","__background-color--selected":"#ffffff","__color":"#262626","__color--hover":"#046791","__color--active":"#034866","__color--disabled":"#404040","__color--selected":"#046791","__border-color--disabled":"#d9d9d9","__border-color--selected":"#046791","-panel__background-color":"#ffffff"},"text-input":{"__line-height":"1.3","__background-color--disabled":"#d9d9d9","__border-width":"2px","__border-width--error":"3px","__border-color":"#262626","__border-color--disabled":"#a6a6a6","__border-color--error":"#e31c3d","__border-color--error--inverse":"#eb6077","__border-color--inverse":"#000000","__color":"#262626","__divider-color":"#a6a6a6","__padding":"8px","__border-radius":"0"},"tooltip":{"__background-color":"#ffffff","__border-color":"#404040","__border-color--active":"#04679140","__border-color--inverse-active":"#ffffff40","__border-width":"1px","__color":"#262626","__box-shadow-color":"#a6a6a6","-icon__color":"#046791","-icon__color--inverse":"#ffffff","-trigger__color":"#046791"},"typography":{"-heading__font-family":"inherit","-heading__font-weight":700,"-heading-4xl__font-weight":"inherit","-heading-3xl__font-weight":"inherit","-heading-lg__font-weight":700,"-heading-md__font-weight":700,"-heading-sm__font-weight":400,"-body__font-family":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif"},"usa-banner":{"__background-color":"#f2f2f2","__color":"#262626","__max-width":"1104px","-gutter-width":"32px","-heading__font-family":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","-heading__line-height":"1.1","-heading__font-size":".875rem","-panel__font-family":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","-panel__line-height":1.5,"-panel__font-size":"1rem","-link__color":"#046791","-domain-icon__color":"#046791","-security-icon__color":"#59ac56","-close-button__background-color--mobile":"#d9d9d9","-close-button__color--mobile":"#046791"},"vertical-nav":{"-item__background-color--hover":"#f2f2f2","-item__color--hover":"#046791","-item__border-color":"#5a5a5a","-label__color":"#262626","-label-icon__color":"#262626","-label__border-color--current":"#046791","-label__color--current":"#046791"}}'
          );

          /***/
        },

      /***/ '../../dist/healthcare.tokens.json':
        /*!**************************************************************************************************************!*\
  !*** /Users/patrickwolfert/Projects/design-system/packages/design-system-tokens/dist/healthcare.tokens.json ***!
  \**************************************************************************************************************/
        /*! exports provided: animation, color, font, global, measure, media, radius, shadow, spacer, z, default */
        /***/ function (module) {
          module.exports = JSON.parse(
            '{"animation":{"ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","speed-base":1,"speed-1":"0.25s","speed-2":"0.3s","speed-3":"0.5s","speed-4":"0.8s"},"color":{"white":"#ffffff","black":"#000000","transparent":"#ffffff00","transparent-black-alpha50":"#00000080","transparent-black-alpha25":"#00000040","transparent-white-alpha50":"#ffffff80","transparent-white-alpha25":"#ffffff40","background":"#ffffff","background-dialog":"#ffffff","background-dialog-mask":"#00000080","background-inverse":"#00395e","base":"#262626","base-inverse":"#ffffff","border":"#d9d9d9","border-dark":"#0f1e38","border-inverse":"#ffffff","error-lightest":"#fce8ec","error-lighter":"#f7bbc5","error-light":"#eb6077","error":"#e31c3d","error-dark":"#cc1937","error-darker":"#9f142b","error-darkest":"#720e1f","focus-light":"#ffffff","focus-dark":"#dd3603","gray-lightest":"#f2f2f2","gray-lighter":"#d9d9d9","gray-light":"#a6a6a6","gray":"#808080","gray-dark":"#5a5a5a","gray-darker":"#404040","gray-darkest":"#262626","muted":"#5a5a5a","muted-inverse":"#e9ecf1","primary-lightest":"#e6f0f4","primary-lighter":"#b4d1de","primary-light":"#4f95b2","primary":"#046791","primary-dark":"#045d83","primary-darker":"#034866","primary-darkest":"#023449","secondary-lightest":"#e7f3e7","secondary-lighter":"#b8dcb7","secondary-light":"#59ac56","secondary":"#12890e","secondary-dark":"#107b0d","secondary-darker":"#0d600a","secondary-darkest":"#094507","accent-primary-lightest":"#fcebe6","accent-primary-lighter":"#f5c3b3","accent-primary-light":"#e7724f","accent-primary":"#dd3603","accent-primary-dark":"#c73103","accent-primary-darker":"#9b2602","accent-primary-darkest":"#6f1b02","info-lightest":"#ecf4fa","info-lighter":"#c5dff1","info-light":"#78b4dd","info":"#3e94cf","info-dark":"#3885ba","info-darker":"#2b6891","info-darkest":"#1f4a68","success-lightest":"#e7f3e7","success-lighter":"#b8dcb7","success-light":"#59ac56","success":"#12890e","success-dark":"#107b0d","success-darker":"#0d600a","success-darkest":"#094507","warn-lightest":"#fef9e9","warn-lighter":"#fdedbc","warn-light":"#fad662","warn":"#f8c41f","warn-dark":"#dfb01c","warn-darker":"#ae8916","warn-darkest":"#7c6210","visited":"#4c2c92"},"font":{"sans":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","serif":"Bitter, Superclarendon, \'Bookman Old Style\', \'URW Bookman\', \'URW Bookman L\', \'Georgia Pro\', Georgia, serif","family-open-sans":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","family-rubik":"Rubik, Seravek, \'Gill Sans Nova\', Ubuntu, Calibri, \'DejaVu Sans\', source-sans-pro, sans-serif","family-montserrat":"Montserrat, Avenir, Corbel, \'URW Gothic\', source-sans-pro, sans-serif","family-bitter":"Bitter, Superclarendon, \'Bookman Old Style\', \'URW Bookman\', \'URW Bookman L\', \'Georgia Pro\', Georgia, serif","line-height-reset":1,"line-height-heading":1.3,"line-height-base":1.5,"line-height-lead":1.7,"size-base":"1rem","size-sm":".875rem","size-md":"1rem","size-lg":"1.125rem","size-xl":"1.3125rem","size-2xl":"1.5rem","size-3xl":"2.25rem","size-4xl":"3rem","size-5xl":"3.75rem","weight-light":300,"weight-normal":400,"weight-semibold":600,"weight-bold":700},"global":{"article-max-width":"600px","grid-columns":"12","grid-gutter-width":"32px","grid-form-gutter-width":"16px","lead-max-width":"77rem","nav-width":"951px","site-margins":"3rem","site-margins-mobile":"1.5rem","site-max-width":"1104px","text-max-width":"53rem"},"measure":{"narrow":"45ex","base":"65ex","wide":"80ex"},"media":{"width-xs":"0px","width-sm":"544px","width-md":"768px","width-lg":"1024px","width-xl":"1280px"},"radius":{"circle":"100%","default":"3px","large":"8px","medium":"4px","pill":"9999px","small":"2px"},"shadow":{"focus":"inset 0 0 0 1px #262626","focus-inverse":"inset 0 0 0 1px #262626","focus-link":"0 3px #262626","base-offset-x":"2px","base-offset-y":"2px","base-blur-radius":"4px","base-color":"#00000040","base":"2px 2px 4px"},"spacer":{"1":"8px","2":"16px","3":"24px","4":"32px","5":"40px","6":"48px","7":"56px","none":"0px","half":"4px"},"z":{"deep":-99999,"default":1,"drawer":500,"dialog":1000,"popup":6000,"spinner":9050}}'
          );

          /***/
        },

      /***/ '../../dist/medicare-component.tokens.json':
        /*!**********************************************************************************************************************!*\
  !*** /Users/patrickwolfert/Projects/design-system/packages/design-system-tokens/dist/medicare-component.tokens.json ***!
  \**********************************************************************************************************************/
        /*! exports provided: accordion, alert, autocomplete, badge, button, button-alt, button-dark, button-dark-alt, button-solid, button-solid-alt, button-solid-dark, button-solid-dark-alt, button-ghost, button-ghost-alt, button-ghost-dark, button-ghost-dark-alt, choice, datefield, day-picker, dialog, drawer, dropdown, filter-chip, form, icon, link, pagination, review, steplist, spinner, table, tabs, text-input, tooltip, typography, usa-banner, vertical-nav, default */
        /***/ function (module) {
          module.exports = JSON.parse(
            '{"accordion":{"__color":"#404040","__background-color":"#f2f2f2","__background-color--hover":"#d9d9d9","__border-color":"#f2f2f2","__border-radius":0,"__border-width":"4px","-button__color":"#404040","-content__background-color":"#ffffff"},"alert":{"__background-color":"#e9ecf1","__background-color--error":"#f7e6e6","__background-color--lightweight":"#ffffff","__background-color--success":"#e7f3e7","__background-color--warn":"#fef9e9","__border-left-color":"#1e3c70","__border-color--error":"#b20000","__border-color--success":"#12890e","__border-color--warn":"#f8c41f","__font-color":"#404040","__icon-size":"40px","__padding":"16px","-bar__width":"8px","-link__font-color":"#1e3c70","-link__font-color--hover":"#1b3665","-link__font-color--focus":"#0f1e38","-link__font-color--active":"#0f1e38"},"autocomplete":{"__background-color":"#ffffff","__border-color":"#d9d9d9","-item__font-color":"#146a5d","-item__background-color--active":"#0f1e38","-item__font-color--active":"#ffffff","-item-message__font-color":"#5a5a5a"},"badge":{"__background-color":"#5a5a5a","__background-color--alert":"#b20000","__background-color--info":"#146a5d","__background-color--success":"#12890e","__background-color--warn":"#f8c41f","__font-color":"#ffffff","__font-color--alert":"#ffffff","__font-color--info":"#ffffff","__font-color--success":"#ffffff","__font-color--warn":"#404040","__border-radius":"9999px"},"button":{"__background-color--active":"#ffffff","__background-color--disabled":"#ffffff","__background-color--hover":"#1b3665","__background-color":"#ffffff","__border-color--active":"#62779b","__border-color--disabled":"currentColor","__border-color--hover":"#1b3665","__border-color":"currentColor","__border-radius":"3px","__border-width":"1px","__color--active":"#62779b","__color--disabled":"#d9d9d9","__color--hover":"#ffffff","__color":"#1e3c70","__font-weight":400,"-icon__fill":"currentColor"},"button-alt":{"__background-color--active":"#ffffff","__background-color--disabled":"#ffffff","__background-color--hover":"#125f54","__background-color":"#ffffff","__border-color--active":"#5b978e","__border-color--disabled":"currentColor","__border-color--hover":"#125f54","__border-color":"currentColor","__color--active":"#5b978e","__color--disabled":"#d9d9d9","__color--hover":"#ffffff","__color":"#146a5d"},"button-dark":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#f2f2f2","__color":"#ffffff"},"button-dark-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"currentColor","__border-color--disabled":"currentColor","__border-color--hover":"currentColor","__border-color":"currentColor","__color--active":"#62779b","__color--disabled":"#5a5a5a","__color--hover":"#bcc5d4","__color":"#e9ecf1"},"button-solid":{"__background-color--active":"#5b978e","__background-color--disabled":"#d9d9d9","__background-color--hover":"#125f54","__background-color":"#146a5d","__border-color--active":"#5b978e","__border-color--disabled":"#d9d9d9","__border-color--hover":"#125f54","__border-color":"#146a5d","__color--active":"#ffffff","__color--disabled":"#404040","__color--hover":"#ffffff","__color":"#ffffff"},"button-solid-alt":{"__background-color--active":"#62779b","__background-color--disabled":"#d9d9d9","__background-color--hover":"#1b3665","__background-color":"#1e3c70","__border-color--active":"#62779b","__border-color--disabled":"#d9d9d9","__border-color--hover":"#1b3665","__border-color":"#1e3c70","__color--active":"#ffffff","__color--disabled":"#404040","__color--hover":"#ffffff","__color":"#ffffff"},"button-solid-dark":{"__background-color--active":"#ffffff","__background-color--disabled":"#d9d9d9","__background-color--hover":"#125f54","__background-color":"#ffffff","__border-color--active":"#ffffff","__border-color--disabled":"#d9d9d9","__border-color--hover":"#125f54","__border-color":"#ffffff","__color--active":"#5b978e","__color--disabled":"#404040","__color--hover":"#ffffff","__color":"#146a5d"},"button-solid-dark-alt":{"__background-color--active":"#ffffff","__background-color--disabled":"#d9d9d9","__background-color--hover":"#1b3665","__background-color":"#ffffff","__border-color--active":"#ffffff","__border-color--disabled":"#d9d9d9","__border-color--hover":"#1b3665","__border-color":"#ffffff","__color--active":"#62779b","__color--disabled":"#404040","__color--hover":"#ffffff","__color":"#1e3c70"},"button-ghost":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#62779b","__color--disabled":"#d9d9d9","__color--hover":"#1b3665","__color":"#1e3c70"},"button-ghost-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#5b978e","__color--disabled":"#d9d9d9","__color--hover":"#0e4a41","__color":"#146a5d"},"button-ghost-dark":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#f2f2f2","__color":"#ffffff"},"button-ghost-dark-alt":{"__background-color--active":"transparent","__background-color--disabled":"transparent","__background-color--hover":"transparent","__background-color":"transparent","__border-color--active":"transparent","__border-color--disabled":"transparent","__border-color--hover":"transparent","__border-color":"transparent","__color--active":"#d9d9d9","__color--disabled":"#5a5a5a","__color--hover":"#f2f2f2","__color":"#ffffff"},"choice":{"__background-color":"#ffffff","__background-color--checked":"#1e3c70","__background-color--disabled":"#d9d9d9","__background-color--inverse":"#ffffff00","__background-color--disabled--inverse":"#e9ecf126","__border-color":"#5a5a5a","__border-color--checked":"#1e3c70","__border-color--disabled":"#a6a6a6","__border-color--error":"#808080","__border-color--error--inverse":"#ffffff","__border-color--hover":"#1e3c70","__border-color--inverse":"#ffffff","__border-color--left":"#146a5d","__border-color--focus":"#0e4a41","__border-color--disabled--inverse":"#a6a6a6","__border-radius":"3px","__border-width":"2px","__color--unchecked":"#ffffff","__color--disabled":"#5a5a5a","__size":"24px","__size--small":"20px","__size-radio":"16px","__size-radio--small":"12px","__translateY":"0.125em","-label__color--disabled":"#5a5a5a","-label__color--disabled--inverse":"#e9ecf1","-wrapper__gap":"1rem","-wrapper__gap--small":"0.75rem"},"datefield":{"-separator__display":"none"},"day-picker":{"-button__background-color--hover":"#e8f0ef"},"dialog":{"__background-color":"#ffffff","__padding":"32px","-overlay__background-color":"#00000080","-icon__size":"1.375rem"},"drawer":{"__animation-timing":"0.3s","__background-color":"#ffffff","__border-color":"#d9d9d9","-close__color":"#000000","-header__background-color":"#ffffff00","-footer__background-color":"#e9ecf1","-toggle__background-color--hover":"#1e3c70","-toggle__color--hover":"#ffffff","-toggle__background-color--hover--inverse":"#ffffff","-toggle__color--hover--inverse":"#5a5a5a"},"dropdown":{"__background-color":"#ffffff","-option-group__padding":"32px"},"filter-chip":{"__border-radius":"9999px","__background-color":"#e9ecf1","__border-color":"#1e3c70","__color":"#404040","__background-color--active":"#146a5d","__border-color--active":"#146a5d","__color--active":"#ffffff","-icon__color":"#404040","-icon__color-active":"#ffffff","-icon__container-size":"18px"},"form":{"-label__color--inverse":"#ffffff","__max-width":"460px","__max-width--small":"6em","__max-width--medium":"12em","-hint__color":"#5a5a5a","-hint__color--inverse":"#e9ecf1","-hint__font-size":"0.875rem","-error__color":"#b20000","-error__color--inverse":"#e8b3b3"},"icon":{"__color--error":"#b20000","__color--inverse":"#ffffff","__color--primary":"#146a5d","__color--success":"#12890e","__color--warn":"#f8c41f"},"link":{"__color":"#1e3c70","__color--active":"#1b3665","__color--hover":"#1b3665","__color--visited":"#590000","-inverse__color":"#ffffff","-inverse__color--active":"#d9d9d9","-inverse__color--hover":"#d9d9d9","-inverse__color--visited":"#d9d9d9","__text-decoration-offset":"3px","__text-decoration-thickness":"1px","__text-decoration-thickness--hover":"2px"},"pagination":{"-link__color":"#146a5d","-link__color--hover":"#0e4a41","-link__color--active":"#0a352f","-link__color--focus":"#0e4a41","-link__color--disabled":"#d9d9d9","-current-page__color":"#404040","-overflow__color":"#5a5a5a","-page-count__color":"#5a5a5a"},"review":{"__border-color":"#d9d9d9"},"steplist":{"__color":"#5a5a5a","__color--current":"#146a5d","__background-color--current":"#146a5d","-step__color":"#5a5a5a","-step__border-color":"#d9d9d9","-step__border-color--default":"#5a5a5a","-step__color--current":"#ffffff","-step__color--completed":"#404040","-step__background-color--completed":"#404040"},"spinner":{"__background-color":"#ffffff","__color":"#404040","__background-color--inverse":"#146a5d","__color--inverse":"#ffffff"},"table":{"__padding":"16px","__border-color":"#000000","-header__background-color":"#f2f2f2","-striped__background-color":"#f2f2f2","-striped-header__background-color":"#f2f2f2"},"tabs":{"__border-color":"#d9d9d9","__background-color":"#ffffff","__background-color--hover":"#ffffff","__background-color--disabled":"#d9d9d9","__background-color--selected":"#ffffff","__color":"#404040","__color--hover":"#146a5d","__color--active":"#0e4a41","__color--disabled":"#404040","__color--selected":"#146a5d","__border-color--disabled":"#d9d9d9","__border-color--selected":"#146a5d","-panel__background-color":"#ffffff"},"text-input":{"__line-height":"1.3","__background-color--disabled":"#d9d9d9","__border-width":"2px","__border-width--disabled":"1px","__border-width--error":"3px","__border-color":"#808080","__border-color--disabled":"#404040","__border-color--error":"#b20000","__border-color--error--inverse":"#e8b3b3","__border-color--inverse":"#808080","__color":"#404040","__divider-color":"#a6a6a6","__padding":"16px","__border-radius":"3px","-currency-icon__line-height":"1","-currency-icon__spacing":"32px"},"tooltip":{"__background-color":"#ffffff","__border-color":"#404040","__border-color--active":"#146a5d40","__border-color--inverse-active":"#ffffff40","__border-width":"1px","__color":"#404040","__box-shadow-color":"#808080","-icon__color":"#146a5d","-icon__color--inverse":"#ffffff","-trigger__color":"#404040"},"typography":{"-heading__font-family":"Montserrat, Avenir, Corbel, \'URW Gothic\', source-sans-pro, sans-serif","-heading__font-weight":600,"-heading-4xl__font-weight":600,"-heading-3xl__font-weight":600,"-heading-lg__font-weight":600,"-heading-md__font-weight":600,"-heading-sm__font-weight":600,"-body__font-family":"Rubik, Seravek, \'Gill Sans Nova\', Ubuntu, Calibri, \'DejaVu Sans\', source-sans-pro, sans-serif"},"usa-banner":{"__background-color":"#f2f2f2","__color":"#404040","__max-width":"unset","-gutter-width":"32px","-heading__font-family":"Rubik, Seravek, \'Gill Sans Nova\', Ubuntu, Calibri, \'DejaVu Sans\', source-sans-pro, sans-serif","-heading__line-height":"1.1","-heading__font-size":".875rem","-panel__font-family":"Rubik, Seravek, \'Gill Sans Nova\', Ubuntu, Calibri, \'DejaVu Sans\', source-sans-pro, sans-serif","-panel__line-height":1.5,"-panel__font-size":"1rem","-link__color":"#146a5d","-domain-icon__color":"#146a5d","-security-icon__color":"#59ac56","-close-button__background-color--mobile":"#d9d9d9","-close-button__color--mobile":"#146a5d"},"vertical-nav":{"-item__background-color--hover":"#f2f2f2","-item__color--hover":"#146a5d","-item__border-color":"#5a5a5a","-label__color":"#404040","-label-icon__color":"#404040","-label__border-color--current":"#146a5d","-label__color--current":"#146a5d"}}'
          );

          /***/
        },

      /***/ '../../dist/medicare.tokens.json':
        /*!************************************************************************************************************!*\
  !*** /Users/patrickwolfert/Projects/design-system/packages/design-system-tokens/dist/medicare.tokens.json ***!
  \************************************************************************************************************/
        /*! exports provided: animation, color, font, global, measure, media, radius, shadow, spacer, z, default */
        /***/ function (module) {
          module.exports = JSON.parse(
            '{"animation":{"ease-in-out-expo":"cubic-bezier(1, 0, 0, 1)","speed-base":1,"speed-1":"0.25s","speed-2":"0.3s","speed-3":"0.5s","speed-4":"0.8s"},"color":{"white":"#ffffff","black":"#000000","transparent":"#ffffff00","transparent-black-alpha50":"#00000080","transparent-black-alpha25":"#00000040","transparent-white-alpha50":"#ffffff80","transparent-white-alpha25":"#ffffff40","background":"#ffffff","background-dialog":"#ffffff","background-dialog-mask":"#00000080","background-inverse":"#146a5d","base":"#404040","base-inverse":"#ffffff","border":"#d9d9d9","border-dark":"#0f1e38","border-inverse":"#ffffff","error-lightest":"#f7e6e6","error-lighter":"#e8b3b3","error-light":"#c94d4d","error":"#b20000","error-dark":"#a00000","error-darker":"#7d0000","error-darkest":"#590000","focus-light":"#ffffff","focus-dark":"#c97532","gray-lightest":"#f2f2f2","gray-lighter":"#d9d9d9","gray-light":"#a6a6a6","gray":"#808080","gray-dark":"#5a5a5a","gray-darker":"#404040","gray-darkest":"#262626","muted":"#5a5a5a","muted-inverse":"#e9ecf1","primary-lightest":"#e8f0ef","primary-lighter":"#b9d2ce","primary-light":"#5b978e","primary":"#146a5d","primary-dark":"#125f54","primary-darker":"#0e4a41","primary-darkest":"#0a352f","secondary-lightest":"#e9ecf1","secondary-lighter":"#bcc5d4","secondary-light":"#62779b","secondary":"#1e3c70","secondary-dark":"#1b3665","secondary-darker":"#152a4e","secondary-darkest":"#0f1e38","accent-primary-lightest":"#f7e6e6","accent-primary-lighter":"#e8b3b3","accent-primary-light":"#c94d4d","accent-primary":"#b20000","accent-primary-dark":"#a00000","accent-primary-darker":"#7d0000","accent-primary-darkest":"#590000","info-lightest":"#e9ecf1","info-lighter":"#bcc5d4","info-light":"#62779b","info":"#1e3c70","info-dark":"#1b3665","info-darker":"#152a4e","info-darkest":"#0f1e38","success-lightest":"#e7f3e7","success-lighter":"#b8dcb7","success-light":"#59ac56","success":"#12890e","success-dark":"#107b0d","success-darker":"#0d600a","success-darkest":"#094507","warn-lightest":"#fef9e9","warn-lighter":"#fdedbc","warn-light":"#fad662","warn":"#f8c41f","warn-dark":"#dfb01c","warn-darker":"#ae8916","warn-darkest":"#7c6210","visited":"#590000"},"font":{"family-open-sans":"\'Open Sans\', Inter, Roboto, \'Helvetica Neue\', \'Arial Nova\', \'Nimbus Sans\', Arial, sans-serif","family-rubik":"Rubik, Seravek, \'Gill Sans Nova\', Ubuntu, Calibri, \'DejaVu Sans\', source-sans-pro, sans-serif","family-montserrat":"Montserrat, Avenir, Corbel, \'URW Gothic\', source-sans-pro, sans-serif","family-bitter":"Bitter, Superclarendon, \'Bookman Old Style\', \'URW Bookman\', \'URW Bookman L\', \'Georgia Pro\', Georgia, serif","line-height-reset":1,"line-height-heading":1.3,"line-height-base":1.5,"line-height-lead":1.7,"size-base":"1rem","size-sm":".875rem","size-md":"1rem","size-lg":"1.25rem","size-xl":"1.5rem","size-2xl":"2rem","size-3xl":"2.5rem","size-4xl":"2.75rem","size-5xl":"3.125rem","weight-light":400,"weight-normal":400,"weight-semibold":600,"weight-bold":600,"sans":"Rubik, Seravek, \'Gill Sans Nova\', Ubuntu, Calibri, \'DejaVu Sans\', source-sans-pro, sans-serif","montserrat":"Montserrat, Avenir, Corbel, \'URW Gothic\', source-sans-pro, sans-serif","rubik":"Rubik, Seravek, \'Gill Sans Nova\', Ubuntu, Calibri, \'DejaVu Sans\', source-sans-pro, sans-serif"},"global":{"article-max-width":"600px","grid-columns":"12","grid-gutter-width":"32px","grid-form-gutter-width":"16px","lead-max-width":"77rem","nav-width":"951px","site-margins":"3rem","site-margins-mobile":"1.5rem","site-max-width":"1104px","text-max-width":"53rem"},"measure":{"narrow":"45ex","base":"65ex","wide":"80ex"},"media":{"width-xs":"0px","width-sm":"544px","width-md":"768px","width-lg":"1024px","width-xl":"1280px"},"radius":{"circle":"100%","default":"3px","large":"8px","medium":"4px","pill":"9999px","small":"2px"},"shadow":{"focus":"inset 0 0 0 1px #404040","focus-inverse":"inset 0 0 0 1px #404040","focus-link":"0 3px #404040","box-card":"0 2px 3px 0 rgba(50, 50, 50, 0.23)","base-offset-x":"2px","base-offset-y":"2px","base-blur-radius":"4px","base-color":"#00000040","base":"2px 2px 4px"},"spacer":{"1":"8px","2":"16px","3":"24px","4":"32px","5":"40px","6":"48px","7":"56px","none":"0px","half":"4px"},"z":{"deep":-99999,"default":1,"drawer":500,"dialog":1000,"popup":6000,"spinner":9050}}'
          );

          /***/
        },

      /***/ './node_modules/@skpm/dialog/lib/index.js':
        /*!************************************************!*\
  !*** ./node_modules/@skpm/dialog/lib/index.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          /* let's try to match the API from Electron's Dialog
(https://github.com/electron/electron/blob/master/docs/api/dialog.md) */

          module.exports = {
            showOpenDialog: __webpack_require__(
              /*! ./open-dialog */ './node_modules/@skpm/dialog/lib/open-dialog.js'
            ).openDialog,
            showOpenDialogSync: __webpack_require__(
              /*! ./open-dialog */ './node_modules/@skpm/dialog/lib/open-dialog.js'
            ).openDialogSync,
            showSaveDialog: __webpack_require__(
              /*! ./save-dialog */ './node_modules/@skpm/dialog/lib/save-dialog.js'
            ).saveDialog,
            showSaveDialogSync: __webpack_require__(
              /*! ./save-dialog */ './node_modules/@skpm/dialog/lib/save-dialog.js'
            ).saveDialogSync,
            showMessageBox: __webpack_require__(
              /*! ./message-box */ './node_modules/@skpm/dialog/lib/message-box.js'
            ).messageBox,
            showMessageBoxSync: __webpack_require__(
              /*! ./message-box */ './node_modules/@skpm/dialog/lib/message-box.js'
            ).messageBoxSync,
            // showErrorBox: require('./error-box'),
          };

          /***/
        },

      /***/ './node_modules/@skpm/dialog/lib/message-box.js':
        /*!******************************************************!*\
  !*** ./node_modules/@skpm/dialog/lib/message-box.js ***!
  \******************************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          /* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
          var utils = __webpack_require__(
            /*! ./utils */ './node_modules/@skpm/dialog/lib/utils.js'
          );

          var typeMap = {
            none: 0,
            info: 1,
            error: 2,
            question: 1,
            warning: 2,
          };

          function setupOptions(document, options) {
            if (
              !document ||
              (typeof document.isKindOfClass !== 'function' && !document.sketchObject)
            ) {
              options = document;
              document = undefined;
            } else if (document.sketchObject) {
              document = document.sketchObject;
            }
            if (!options) {
              options = {};
            }

            var dialog = NSAlert.alloc().init();

            if (options.type) {
              dialog.alertStyle = typeMap[options.type] || 0;
            }

            if (options.buttons && options.buttons.length) {
              options.buttons.forEach(function addButton(button) {
                dialog.addButtonWithTitle(
                  options.normalizeAccessKeys ? button.replace(/&/g, '') : button
                );
                // TODO: add keyboard shortcut if options.normalizeAccessKeys
              });
            }

            if (typeof options.defaultId !== 'undefined') {
              var buttons = dialog.buttons();
              if (options.defaultId < buttons.length) {
                // Focus the button at defaultId if the user opted to do so.
                // The first button added gets set as the default selected.
                // So remove that default, and make the requested button the default.
                buttons[0].setKeyEquivalent('');
                buttons[options.defaultId].setKeyEquivalent('\r');
              }
            }

            if (options.title) {
              // not shown on macOS
            }

            if (options.message) {
              dialog.messageText = options.message;
            }

            if (options.detail) {
              dialog.informativeText = options.detail;
            }

            if (options.checkboxLabel) {
              dialog.showsSuppressionButton = true;
              dialog.suppressionButton().title = options.checkboxLabel;

              if (typeof options.checkboxChecked !== 'undefined') {
                dialog.suppressionButton().state = options.checkboxChecked ? NSOnState : NSOffState;
              }
            }

            if (options.icon) {
              if (typeof options.icon === 'string') {
                options.icon = NSImage.alloc().initWithContentsOfFile(options.icon);
              }
              dialog.icon = options.icon;
            } else if (
              typeof __command !== 'undefined' &&
              __command.pluginBundle() &&
              __command.pluginBundle().icon()
            ) {
              dialog.icon = __command.pluginBundle().icon();
            } else {
              var icon = NSImage.imageNamed('plugins');
              if (icon) {
                dialog.icon = icon;
              }
            }

            return {
              document: document,
              options: options,
              dialog: dialog,
            };
          }

          // https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowmessageboxbrowserwindow-options
          module.exports.messageBox = function messageBox(document, options) {
            var setup = setupOptions(document, options);

            return utils.runDialog(
              setup.dialog,
              function getResult(_dialog, returnCode) {
                return {
                  response:
                    setup.options.buttons && setup.options.buttons.length
                      ? Number(returnCode) - 1000
                      : Number(returnCode),
                  checkboxChecked: _dialog.suppressionButton().state() == NSOnState,
                };
              },
              setup.document
            );
          };

          // https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowmessageboxsyncbrowserwindow-options
          module.exports.messageBoxSync = function messageBoxSync(document, options) {
            var setup = setupOptions(document, options);

            return utils.runDialogSync(
              setup.dialog,
              function getResult(_dialog, returnCode) {
                return setup.options.buttons && setup.options.buttons.length
                  ? Number(returnCode) - 1000
                  : Number(returnCode);
              },
              setup.document
            );
          };

          /***/
        },

      /***/ './node_modules/@skpm/dialog/lib/open-dialog.js':
        /*!******************************************************!*\
  !*** ./node_modules/@skpm/dialog/lib/open-dialog.js ***!
  \******************************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          /* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
          var utils = __webpack_require__(
            /*! ./utils */ './node_modules/@skpm/dialog/lib/utils.js'
          );

          function setupOptions(document, options) {
            if (
              !document ||
              (typeof document.isKindOfClass !== 'function' && !document.sketchObject)
            ) {
              options = document;
              document = undefined;
            }
            if (!options) {
              options = {};
            }

            var dialog = NSOpenPanel.openPanel();

            if (options.title) {
              dialog.title = options.title;
            }

            if (options.defaultPath) {
              dialog.setDirectoryURL(utils.getURL(options.defaultPath));
            }

            if (options.buttonLabel) {
              dialog.prompt = options.buttonLabel;
            }

            if (options.filters && options.filters.length) {
              var exts = [];
              options.filters.forEach(function setFilter(filter) {
                filter.extensions.forEach(function setExtension(ext) {
                  exts.push(ext);
                });
              });

              dialog.allowedFileTypes = exts;
            }

            var hasProperty = Array.isArray(options.properties) && options.properties.length > 0;
            dialog.canChooseFiles = hasProperty && options.properties.indexOf('openFile') !== -1;
            dialog.canChooseDirectories =
              hasProperty && options.properties.indexOf('openDirectory') !== -1;
            dialog.allowsMultipleSelection =
              hasProperty && options.properties.indexOf('multiSelections') !== -1;
            dialog.showsHiddenFiles =
              hasProperty && options.properties.indexOf('showHiddenFiles') !== -1;
            dialog.canCreateDirectories =
              hasProperty && options.properties.indexOf('createDirectory') !== -1;
            dialog.resolvesAliases =
              !hasProperty || options.properties.indexOf('noResolveAliases') === -1;
            dialog.treatsFilePackagesAsDirectories =
              hasProperty && options.properties.indexOf('treatPackageAsDirectory') !== -1;

            if (options.message) {
              dialog.message = options.message;
            }

            return {
              document: document,
              options: options,
              dialog: dialog,
            };
          }

          // https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options
          module.exports.openDialog = function openDialog(document, options) {
            var setup = setupOptions(document, options);

            return utils.runDialog(
              setup.dialog,
              function getResult(_dialog, returnCode) {
                if (returnCode != NSOKButton) {
                  return {
                    canceled: true,
                    filePaths: [],
                  };
                }
                var result = [];
                var urls = _dialog.URLs();
                for (var k = 0; k < urls.length; k += 1) {
                  result.push(String(urls[k].path()));
                }
                return {
                  canceled: false,
                  filePaths: result,
                };
              },
              setup.document
            );
          };

          // https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogsyncbrowserwindow-options
          module.exports.openDialogSync = function openDialogSync(document, options) {
            var setup = setupOptions(document, options);

            return utils.runDialogSync(
              setup.dialog,
              function getResult(_dialog, returnCode) {
                if (returnCode != NSOKButton) {
                  return [];
                }
                var result = [];
                var urls = _dialog.URLs();
                for (var k = 0; k < urls.length; k += 1) {
                  result.push(String(urls[k].path()));
                }
                return result;
              },
              setup.document
            );
          };

          /***/
        },

      /***/ './node_modules/@skpm/dialog/lib/save-dialog.js':
        /*!******************************************************!*\
  !*** ./node_modules/@skpm/dialog/lib/save-dialog.js ***!
  \******************************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          /* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign */
          var utils = __webpack_require__(
            /*! ./utils */ './node_modules/@skpm/dialog/lib/utils.js'
          );

          function setupOptions(document, options) {
            if (
              !document ||
              (typeof document.isKindOfClass !== 'function' && !document.sketchObject)
            ) {
              options = document;
              document = undefined;
            }
            if (!options) {
              options = {};
            }

            var dialog = NSSavePanel.savePanel();

            if (options.title) {
              dialog.title = options.title;
            }

            if (options.defaultPath) {
              // that's a path
              dialog.setDirectoryURL(utils.getURL(options.defaultPath));

              if (
                options.defaultPath[0] === '.' ||
                options.defaultPath[0] === '~' ||
                options.defaultPath[0] === '/'
              ) {
                var parts = options.defaultPath.split('/');
                if (parts.length > 1 && parts[parts.length - 1]) {
                  dialog.setNameFieldStringValue(parts[parts.length - 1]);
                }
              } else {
                dialog.setNameFieldStringValue(options.defaultPath);
              }
            }

            if (options.buttonLabel) {
              dialog.prompt = options.buttonLabel;
            }

            if (options.filters && options.filters.length) {
              var exts = [];
              options.filters.forEach(function setFilter(filter) {
                filter.extensions.forEach(function setExtension(ext) {
                  exts.push(ext);
                });
              });

              if (dialog.allowedContentTypes) {
                // Big Sur and newer.
                dialog.allowedContentTypes = exts.map((ext) =>
                  UTType.typeWithFilenameExtension(ext)
                );
              } else {
                // Catalina and older.
                dialog.allowedFileTypes = exts;
              }
            }

            if (options.message) {
              dialog.message = options.message;
            }

            if (options.nameFieldLabel) {
              dialog.nameFieldLabel = options.nameFieldLabel;
            }

            if (options.showsTagField) {
              dialog.showsTagField = options.showsTagField;
            }

            return {
              document: document,
              options: options,
              dialog: dialog,
            };
          }

          // https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowsavedialogbrowserwindow-options
          module.exports.saveDialog = function saveDialog(document, options) {
            var setup = setupOptions(document, options);

            return utils.runDialog(
              setup.dialog,
              function getResult(_dialog, returnCode) {
                return {
                  canceled: returnCode != NSOKButton,
                  filePath: returnCode == NSOKButton ? String(_dialog.URL().path()) : undefined,
                };
              },
              setup.document
            );
          };

          // https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowsavedialogsyncbrowserwindow-options
          module.exports.saveDialogSync = function saveDialogSync(document, options) {
            var setup = setupOptions(document, options);

            return utils.runDialogSync(
              setup.dialog,
              function getResult(_dialog, returnCode) {
                return returnCode == NSOKButton ? String(_dialog.URL().path()) : undefined;
              },
              setup.document
            );
          };

          /***/
        },

      /***/ './node_modules/@skpm/dialog/lib/utils.js':
        /*!************************************************!*\
  !*** ./node_modules/@skpm/dialog/lib/utils.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          /* WEBPACK VAR INJECTION */ (function (Promise) {
            module.exports.getURL = function getURL(path) {
              return NSURL.URLWithString(
                String(NSString.stringWithString(path).stringByExpandingTildeInPath()).replace(
                  / /g,
                  '%20'
                )
              );
            };

            module.exports.runDialog = function runDialog(dialog, getResult, document) {
              if (!document) {
                var returnCode = dialog.runModal();
                return Promise.resolve(getResult(dialog, returnCode));
              }

              var fiber = coscript.createFiber();

              var window = (document.sketchObject || document).documentWindow();

              return new Promise(function p(resolve, reject) {
                dialog.beginSheetModalForWindow_completionHandler(
                  window,
                  __mocha__.createBlock_function('v16@?0q8', function onCompletion(_returnCode) {
                    try {
                      resolve(getResult(dialog, _returnCode));
                    } catch (err) {
                      reject(err);
                    }
                    NSApp.endSheet(dialog);
                    if (fiber) {
                      fiber.cleanup();
                    } else {
                      coscript.shouldKeepAround = false;
                    }
                  })
                );
              });
            };

            module.exports.runDialogSync = function runDialog(dialog, getResult, document) {
              var returnCode;

              if (!document) {
                returnCode = dialog.runModal();
                return getResult(dialog, returnCode);
              }

              var window = (document.sketchObject || document).documentWindow();

              dialog.beginSheetModalForWindow_completionHandler(
                window,
                __mocha__.createBlock_function('v16@?0q8', function onCompletion(_returnCode) {
                  NSApp.stopModalWithCode(_returnCode);
                })
              );

              returnCode = NSApp.runModalForWindow(window);
              NSApp.endSheet(dialog);
              return getResult(dialog, returnCode);
            };

            /* WEBPACK VAR INJECTION */
          }).call(
            this,
            __webpack_require__(
              /*! ./node_modules/promise-polyfill/lib/index.js */ './node_modules/promise-polyfill/lib/index.js'
            )
          );

          /***/
        },

      /***/ './node_modules/process/browser.js':
        /*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
        /*! no static exports found */
        /***/ function (module, exports) {
          // shim for using process in browser
          var process = (module.exports = {});

          // cached from whatever global is present so that test runners that stub it
          // don't break things.  But we need to wrap it in a try catch in case it is
          // wrapped in strict mode code which doesn't define any globals.  It's inside a
          // function because try/catches deoptimize in certain engines.

          var cachedSetTimeout;
          var cachedClearTimeout;

          function defaultSetTimout() {
            throw new Error('setTimeout has not been defined');
          }
          function defaultClearTimeout() {
            throw new Error('clearTimeout has not been defined');
          }
          (function () {
            try {
              if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
              } else {
                cachedSetTimeout = defaultSetTimout;
              }
            } catch (e) {
              cachedSetTimeout = defaultSetTimout;
            }
            try {
              if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
              } else {
                cachedClearTimeout = defaultClearTimeout;
              }
            } catch (e) {
              cachedClearTimeout = defaultClearTimeout;
            }
          })();
          function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) {
              //normal enviroments in sane situations
              return setTimeout(fun, 0);
            }
            // if setTimeout wasn't available but was latter defined
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
              cachedSetTimeout = setTimeout;
              return setTimeout(fun, 0);
            }
            try {
              // when when somebody has screwed with setTimeout but no I.E. maddness
              return cachedSetTimeout(fun, 0);
            } catch (e) {
              try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
              } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
              }
            }
          }
          function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) {
              //normal enviroments in sane situations
              return clearTimeout(marker);
            }
            // if clearTimeout wasn't available but was latter defined
            if (
              (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
              clearTimeout
            ) {
              cachedClearTimeout = clearTimeout;
              return clearTimeout(marker);
            }
            try {
              // when when somebody has screwed with setTimeout but no I.E. maddness
              return cachedClearTimeout(marker);
            } catch (e) {
              try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
              } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
              }
            }
          }
          var queue = [];
          var draining = false;
          var currentQueue;
          var queueIndex = -1;

          function cleanUpNextTick() {
            if (!draining || !currentQueue) {
              return;
            }
            draining = false;
            if (currentQueue.length) {
              queue = currentQueue.concat(queue);
            } else {
              queueIndex = -1;
            }
            if (queue.length) {
              drainQueue();
            }
          }

          function drainQueue() {
            if (draining) {
              return;
            }
            var timeout = runTimeout(cleanUpNextTick);
            draining = true;

            var len = queue.length;
            while (len) {
              currentQueue = queue;
              queue = [];
              while (++queueIndex < len) {
                if (currentQueue) {
                  currentQueue[queueIndex].run();
                }
              }
              queueIndex = -1;
              len = queue.length;
            }
            currentQueue = null;
            draining = false;
            runClearTimeout(timeout);
          }

          process.nextTick = function (fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) {
              for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
              }
            }
            queue.push(new Item(fun, args));
            if (queue.length === 1 && !draining) {
              runTimeout(drainQueue);
            }
          };

          // v8 likes predictible objects
          function Item(fun, array) {
            this.fun = fun;
            this.array = array;
          }
          Item.prototype.run = function () {
            this.fun.apply(null, this.array);
          };
          process.title = 'browser';
          process.browser = true;
          process.env = {};
          process.argv = [];
          process.version = ''; // empty string to avoid regexp issues
          process.versions = {};

          function noop() {}

          process.on = noop;
          process.addListener = noop;
          process.once = noop;
          process.off = noop;
          process.removeListener = noop;
          process.removeAllListeners = noop;
          process.emit = noop;
          process.prependListener = noop;
          process.prependOnceListener = noop;

          process.listeners = function (name) {
            return [];
          };

          process.binding = function (name) {
            throw new Error('process.binding is not supported');
          };

          process.cwd = function () {
            return '/';
          };
          process.chdir = function (dir) {
            throw new Error('process.chdir is not supported');
          };
          process.umask = function () {
            return 0;
          };

          /***/
        },

      /***/ './node_modules/promise-polyfill/lib/index.js':
        /*!****************************************************!*\
  !*** ./node_modules/promise-polyfill/lib/index.js ***!
  \****************************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          'use strict';
          /* WEBPACK VAR INJECTION */ (function (setImmediate) {
            /**
             * @this {Promise}
             */
            function finallyConstructor(callback) {
              var constructor = this.constructor;
              return this.then(
                function (value) {
                  // @ts-ignore
                  return constructor.resolve(callback()).then(function () {
                    return value;
                  });
                },
                function (reason) {
                  // @ts-ignore
                  return constructor.resolve(callback()).then(function () {
                    // @ts-ignore
                    return constructor.reject(reason);
                  });
                }
              );
            }

            function allSettled(arr) {
              var P = this;
              return new P(function (resolve, reject) {
                if (!(arr && typeof arr.length !== 'undefined')) {
                  return reject(
                    new TypeError(
                      typeof arr +
                        ' ' +
                        arr +
                        ' is not iterable(cannot read property Symbol(Symbol.iterator))'
                    )
                  );
                }
                var args = Array.prototype.slice.call(arr);
                if (args.length === 0) return resolve([]);
                var remaining = args.length;

                function res(i, val) {
                  if (val && (typeof val === 'object' || typeof val === 'function')) {
                    var then = val.then;
                    if (typeof then === 'function') {
                      then.call(
                        val,
                        function (val) {
                          res(i, val);
                        },
                        function (e) {
                          args[i] = { status: 'rejected', reason: e };
                          if (--remaining === 0) {
                            resolve(args);
                          }
                        }
                      );
                      return;
                    }
                  }
                  args[i] = { status: 'fulfilled', value: val };
                  if (--remaining === 0) {
                    resolve(args);
                  }
                }

                for (var i = 0; i < args.length; i++) {
                  res(i, args[i]);
                }
              });
            }

            // Store setTimeout reference so promise-polyfill will be unaffected by
            // other code modifying setTimeout (like sinon.useFakeTimers())
            var setTimeoutFunc = setTimeout;
            // @ts-ignore
            var setImmediateFunc = typeof setImmediate !== 'undefined' ? setImmediate : null;

            function isArray(x) {
              return Boolean(x && typeof x.length !== 'undefined');
            }

            function noop() {}

            // Polyfill for Function.prototype.bind
            function bind(fn, thisArg) {
              return function () {
                fn.apply(thisArg, arguments);
              };
            }

            /**
             * @constructor
             * @param {Function} fn
             */
            function Promise(fn) {
              if (!(this instanceof Promise))
                throw new TypeError('Promises must be constructed via new');
              if (typeof fn !== 'function') throw new TypeError('not a function');
              /** @type {!number} */
              this._state = 0;
              /** @type {!boolean} */
              this._handled = false;
              /** @type {Promise|undefined} */
              this._value = undefined;
              /** @type {!Array<!Function>} */
              this._deferreds = [];

              doResolve(fn, this);
            }

            function handle(self, deferred) {
              while (self._state === 3) {
                self = self._value;
              }
              if (self._state === 0) {
                self._deferreds.push(deferred);
                return;
              }
              self._handled = true;
              Promise._immediateFn(function () {
                var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
                if (cb === null) {
                  (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
                  return;
                }
                var ret;
                try {
                  ret = cb(self._value);
                } catch (e) {
                  reject(deferred.promise, e);
                  return;
                }
                resolve(deferred.promise, ret);
              });
            }

            function resolve(self, newValue) {
              try {
                // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
                if (newValue === self)
                  throw new TypeError('A promise cannot be resolved with itself.');
                if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
                  var then = newValue.then;
                  if (newValue instanceof Promise) {
                    self._state = 3;
                    self._value = newValue;
                    finale(self);
                    return;
                  } else if (typeof then === 'function') {
                    doResolve(bind(then, newValue), self);
                    return;
                  }
                }
                self._state = 1;
                self._value = newValue;
                finale(self);
              } catch (e) {
                reject(self, e);
              }
            }

            function reject(self, newValue) {
              self._state = 2;
              self._value = newValue;
              finale(self);
            }

            function finale(self) {
              if (self._state === 2 && self._deferreds.length === 0) {
                Promise._immediateFn(function () {
                  if (!self._handled) {
                    Promise._unhandledRejectionFn(self._value);
                  }
                });
              }

              for (var i = 0, len = self._deferreds.length; i < len; i++) {
                handle(self, self._deferreds[i]);
              }
              self._deferreds = null;
            }

            /**
             * @constructor
             */
            function Handler(onFulfilled, onRejected, promise) {
              this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
              this.onRejected = typeof onRejected === 'function' ? onRejected : null;
              this.promise = promise;
            }

            /**
             * Take a potentially misbehaving resolver function and make sure
             * onFulfilled and onRejected are only called once.
             *
             * Makes no guarantees about asynchrony.
             */
            function doResolve(fn, self) {
              var done = false;
              try {
                fn(
                  function (value) {
                    if (done) return;
                    done = true;
                    resolve(self, value);
                  },
                  function (reason) {
                    if (done) return;
                    done = true;
                    reject(self, reason);
                  }
                );
              } catch (ex) {
                if (done) return;
                done = true;
                reject(self, ex);
              }
            }

            Promise.prototype['catch'] = function (onRejected) {
              return this.then(null, onRejected);
            };

            Promise.prototype.then = function (onFulfilled, onRejected) {
              // @ts-ignore
              var prom = new this.constructor(noop);

              handle(this, new Handler(onFulfilled, onRejected, prom));
              return prom;
            };

            Promise.prototype['finally'] = finallyConstructor;

            Promise.all = function (arr) {
              return new Promise(function (resolve, reject) {
                if (!isArray(arr)) {
                  return reject(new TypeError('Promise.all accepts an array'));
                }

                var args = Array.prototype.slice.call(arr);
                if (args.length === 0) return resolve([]);
                var remaining = args.length;

                function res(i, val) {
                  try {
                    if (val && (typeof val === 'object' || typeof val === 'function')) {
                      var then = val.then;
                      if (typeof then === 'function') {
                        then.call(
                          val,
                          function (val) {
                            res(i, val);
                          },
                          reject
                        );
                        return;
                      }
                    }
                    args[i] = val;
                    if (--remaining === 0) {
                      resolve(args);
                    }
                  } catch (ex) {
                    reject(ex);
                  }
                }

                for (var i = 0; i < args.length; i++) {
                  res(i, args[i]);
                }
              });
            };

            Promise.allSettled = allSettled;

            Promise.resolve = function (value) {
              if (value && typeof value === 'object' && value.constructor === Promise) {
                return value;
              }

              return new Promise(function (resolve) {
                resolve(value);
              });
            };

            Promise.reject = function (value) {
              return new Promise(function (resolve, reject) {
                reject(value);
              });
            };

            Promise.race = function (arr) {
              return new Promise(function (resolve, reject) {
                if (!isArray(arr)) {
                  return reject(new TypeError('Promise.race accepts an array'));
                }

                for (var i = 0, len = arr.length; i < len; i++) {
                  Promise.resolve(arr[i]).then(resolve, reject);
                }
              });
            };

            // Use polyfill for setImmediate for performance gains
            Promise._immediateFn =
              // @ts-ignore
              (typeof setImmediateFunc === 'function' &&
                function (fn) {
                  // @ts-ignore
                  setImmediateFunc(fn);
                }) ||
              function (fn) {
                setTimeoutFunc(fn, 0);
              };

            Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
              if (typeof console !== 'undefined' && console) {
                console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
              }
            };

            module.exports = Promise;

            /* WEBPACK VAR INJECTION */
          }).call(
            this,
            __webpack_require__(
              /*! ./../../timers-browserify/main.js */ './node_modules/timers-browserify/main.js'
            ).setImmediate
          );

          /***/
        },

      /***/ './node_modules/setimmediate/setImmediate.js':
        /*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          /* WEBPACK VAR INJECTION */ (function (global, process) {
            (function (global, undefined) {
              'use strict';

              if (global.setImmediate) {
                return;
              }

              var nextHandle = 1; // Spec says greater than zero
              var tasksByHandle = {};
              var currentlyRunningATask = false;
              var doc = global.document;
              var registerImmediate;

              function setImmediate(callback) {
                // Callback can either be a function or a string
                if (typeof callback !== 'function') {
                  callback = new Function('' + callback);
                }
                // Copy function arguments
                var args = new Array(arguments.length - 1);
                for (var i = 0; i < args.length; i++) {
                  args[i] = arguments[i + 1];
                }
                // Store and register the task
                var task = { callback: callback, args: args };
                tasksByHandle[nextHandle] = task;
                registerImmediate(nextHandle);
                return nextHandle++;
              }

              function clearImmediate(handle) {
                delete tasksByHandle[handle];
              }

              function run(task) {
                var callback = task.callback;
                var args = task.args;
                switch (args.length) {
                  case 0:
                    callback();
                    break;
                  case 1:
                    callback(args[0]);
                    break;
                  case 2:
                    callback(args[0], args[1]);
                    break;
                  case 3:
                    callback(args[0], args[1], args[2]);
                    break;
                  default:
                    callback.apply(undefined, args);
                    break;
                }
              }

              function runIfPresent(handle) {
                // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
                // So if we're currently running a task, we'll need to delay this invocation.
                if (currentlyRunningATask) {
                  // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                  // "too much recursion" error.
                  setTimeout(runIfPresent, 0, handle);
                } else {
                  var task = tasksByHandle[handle];
                  if (task) {
                    currentlyRunningATask = true;
                    try {
                      run(task);
                    } finally {
                      clearImmediate(handle);
                      currentlyRunningATask = false;
                    }
                  }
                }
              }

              function installNextTickImplementation() {
                registerImmediate = function (handle) {
                  process.nextTick(function () {
                    runIfPresent(handle);
                  });
                };
              }

              function canUsePostMessage() {
                // The test against `importScripts` prevents this implementation from being installed inside a web worker,
                // where `global.postMessage` means something completely different and can't be used for this purpose.
                if (global.postMessage && !global.importScripts) {
                  var postMessageIsAsynchronous = true;
                  var oldOnMessage = global.onmessage;
                  global.onmessage = function () {
                    postMessageIsAsynchronous = false;
                  };
                  global.postMessage('', '*');
                  global.onmessage = oldOnMessage;
                  return postMessageIsAsynchronous;
                }
              }

              function installPostMessageImplementation() {
                // Installs an event handler on `global` for the `message` event: see
                // * https://developer.mozilla.org/en/DOM/window.postMessage
                // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

                var messagePrefix = 'setImmediate$' + Math.random() + '$';
                var onGlobalMessage = function (event) {
                  if (
                    event.source === global &&
                    typeof event.data === 'string' &&
                    event.data.indexOf(messagePrefix) === 0
                  ) {
                    runIfPresent(+event.data.slice(messagePrefix.length));
                  }
                };

                if (global.addEventListener) {
                  global.addEventListener('message', onGlobalMessage, false);
                } else {
                  global.attachEvent('onmessage', onGlobalMessage);
                }

                registerImmediate = function (handle) {
                  global.postMessage(messagePrefix + handle, '*');
                };
              }

              function installMessageChannelImplementation() {
                var channel = new MessageChannel();
                channel.port1.onmessage = function (event) {
                  var handle = event.data;
                  runIfPresent(handle);
                };

                registerImmediate = function (handle) {
                  channel.port2.postMessage(handle);
                };
              }

              function installReadyStateChangeImplementation() {
                var html = doc.documentElement;
                registerImmediate = function (handle) {
                  // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                  // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                  var script = doc.createElement('script');
                  script.onreadystatechange = function () {
                    runIfPresent(handle);
                    script.onreadystatechange = null;
                    html.removeChild(script);
                    script = null;
                  };
                  html.appendChild(script);
                };
              }

              function installSetTimeoutImplementation() {
                registerImmediate = function (handle) {
                  setTimeout(runIfPresent, 0, handle);
                };
              }

              // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
              var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
              attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

              // Don't get fooled by e.g. browserify environments.
              if ({}.toString.call(global.process) === '[object process]') {
                // For Node.js before 0.9
                installNextTickImplementation();
              } else if (canUsePostMessage()) {
                // For non-IE10 modern browsers
                installPostMessageImplementation();
              } else if (global.MessageChannel) {
                // For web workers, where supported
                installMessageChannelImplementation();
              } else if (doc && 'onreadystatechange' in doc.createElement('script')) {
                // For IE 6–8
                installReadyStateChangeImplementation();
              } else {
                // For older browsers
                installSetTimeoutImplementation();
              }

              attachTo.setImmediate = setImmediate;
              attachTo.clearImmediate = clearImmediate;
            })(
              typeof self === 'undefined' ? (typeof global === 'undefined' ? this : global) : self
            );

            /* WEBPACK VAR INJECTION */
          }).call(
            this,
            __webpack_require__(
              /*! ./../webpack/buildin/global.js */ './node_modules/webpack/buildin/global.js'
            ),
            __webpack_require__(/*! ./../process/browser.js */ './node_modules/process/browser.js')
          );

          /***/
        },

      /***/ './node_modules/timers-browserify/main.js':
        /*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
        /*! no static exports found */
        /***/ function (module, exports, __webpack_require__) {
          /* WEBPACK VAR INJECTION */ (function (global) {
            var scope =
              (typeof global !== 'undefined' && global) ||
              (typeof self !== 'undefined' && self) ||
              window;
            var apply = Function.prototype.apply;

            // DOM APIs, for completeness

            exports.setTimeout = function () {
              return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
            };
            exports.setInterval = function () {
              return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
            };
            exports.clearTimeout = exports.clearInterval = function (timeout) {
              if (timeout) {
                timeout.close();
              }
            };

            function Timeout(id, clearFn) {
              this._id = id;
              this._clearFn = clearFn;
            }
            Timeout.prototype.unref = Timeout.prototype.ref = function () {};
            Timeout.prototype.close = function () {
              this._clearFn.call(scope, this._id);
            };

            // Does not start the time, just sets up the members needed.
            exports.enroll = function (item, msecs) {
              clearTimeout(item._idleTimeoutId);
              item._idleTimeout = msecs;
            };

            exports.unenroll = function (item) {
              clearTimeout(item._idleTimeoutId);
              item._idleTimeout = -1;
            };

            exports._unrefActive = exports.active = function (item) {
              clearTimeout(item._idleTimeoutId);

              var msecs = item._idleTimeout;
              if (msecs >= 0) {
                item._idleTimeoutId = setTimeout(function onTimeout() {
                  if (item._onTimeout) item._onTimeout();
                }, msecs);
              }
            };

            // setimmediate attaches itself to the global object
            __webpack_require__(/*! setimmediate */ './node_modules/setimmediate/setImmediate.js');
            // On some exotic environments, it's not clear which object `setimmediate` was
            // able to install onto.  Search each possibility in the same order as the
            // `setimmediate` library.
            exports.setImmediate =
              (typeof self !== 'undefined' && self.setImmediate) ||
              (typeof global !== 'undefined' && global.setImmediate) ||
              (this && this.setImmediate);
            exports.clearImmediate =
              (typeof self !== 'undefined' && self.clearImmediate) ||
              (typeof global !== 'undefined' && global.clearImmediate) ||
              (this && this.clearImmediate);

            /* WEBPACK VAR INJECTION */
          }).call(
            this,
            __webpack_require__(
              /*! ./../webpack/buildin/global.js */ './node_modules/webpack/buildin/global.js'
            )
          );

          /***/
        },

      /***/ './node_modules/webpack/buildin/global.js':
        /*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
        /*! no static exports found */
        /***/ function (module, exports) {
          var g;

          // This works in non-strict mode
          g = (function () {
            return this;
          })();

          try {
            // This works if eval is allowed (see CSP)
            g = g || new Function('return this')();
          } catch (e) {
            // This works if the window reference is available
            if (typeof window === 'object') g = window;
          }

          // g can still be undefined, but nothing to do about it...
          // We return undefined, instead of nothing here, so it's
          // easier to handle this case. if(!global) { ...}

          module.exports = g;

          /***/
        },

      /***/ './src/json-token-importer.js':
        /*!************************************!*\
  !*** ./src/json-token-importer.js ***!
  \************************************/
        /*! exports provided: default */
        /***/ function (module, __webpack_exports__, __webpack_require__) {
          'use strict';
          __webpack_require__.r(__webpack_exports__);
          /* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! sketch */ 'sketch'
          );
          /* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default =
            /*#__PURE__*/ __webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
          /* harmony import */ var _skpm_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! @skpm/dialog */ './node_modules/@skpm/dialog/lib/index.js'
          );
          /* harmony import */ var _skpm_dialog__WEBPACK_IMPORTED_MODULE_1___default =
            /*#__PURE__*/ __webpack_require__.n(_skpm_dialog__WEBPACK_IMPORTED_MODULE_1__);
          /* harmony import */ var _themes_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            /*! ../../../../../themes.json */ '../../../../themes.json'
          );
          var _themes_json__WEBPACK_IMPORTED_MODULE_2___namespace =
            /*#__PURE__*/ __webpack_require__.t(
              /*! ../../../../../themes.json */ '../../../../themes.json',
              1
            );
          /* harmony import */ var _dist_core_tokens_json__WEBPACK_IMPORTED_MODULE_3__ =
            __webpack_require__(
              /*! ../../../dist/core.tokens.json */ '../../dist/core.tokens.json'
            );
          var _dist_core_tokens_json__WEBPACK_IMPORTED_MODULE_3___namespace =
            /*#__PURE__*/ __webpack_require__.t(
              /*! ../../../dist/core.tokens.json */ '../../dist/core.tokens.json',
              1
            );
          /* harmony import */ var _dist_core_component_tokens_json__WEBPACK_IMPORTED_MODULE_4__ =
            __webpack_require__(
              /*! ../../../dist/core-component.tokens.json */ '../../dist/core-component.tokens.json'
            );
          var _dist_core_component_tokens_json__WEBPACK_IMPORTED_MODULE_4___namespace =
            /*#__PURE__*/ __webpack_require__.t(
              /*! ../../../dist/core-component.tokens.json */ '../../dist/core-component.tokens.json',
              1
            );
          /* harmony import */ var _dist_healthcare_tokens_json__WEBPACK_IMPORTED_MODULE_5__ =
            __webpack_require__(
              /*! ../../../dist/healthcare.tokens.json */ '../../dist/healthcare.tokens.json'
            );
          var _dist_healthcare_tokens_json__WEBPACK_IMPORTED_MODULE_5___namespace =
            /*#__PURE__*/ __webpack_require__.t(
              /*! ../../../dist/healthcare.tokens.json */ '../../dist/healthcare.tokens.json',
              1
            );
          /* harmony import */ var _dist_healthcare_component_tokens_json__WEBPACK_IMPORTED_MODULE_6__ =
            __webpack_require__(
              /*! ../../../dist/healthcare-component.tokens.json */ '../../dist/healthcare-component.tokens.json'
            );
          var _dist_healthcare_component_tokens_json__WEBPACK_IMPORTED_MODULE_6___namespace =
            /*#__PURE__*/ __webpack_require__.t(
              /*! ../../../dist/healthcare-component.tokens.json */ '../../dist/healthcare-component.tokens.json',
              1
            );
          /* harmony import */ var _dist_medicare_tokens_json__WEBPACK_IMPORTED_MODULE_7__ =
            __webpack_require__(
              /*! ../../../dist/medicare.tokens.json */ '../../dist/medicare.tokens.json'
            );
          var _dist_medicare_tokens_json__WEBPACK_IMPORTED_MODULE_7___namespace =
            /*#__PURE__*/ __webpack_require__.t(
              /*! ../../../dist/medicare.tokens.json */ '../../dist/medicare.tokens.json',
              1
            );
          /* harmony import */ var _dist_medicare_component_tokens_json__WEBPACK_IMPORTED_MODULE_8__ =
            __webpack_require__(
              /*! ../../../dist/medicare-component.tokens.json */ '../../dist/medicare-component.tokens.json'
            );
          var _dist_medicare_component_tokens_json__WEBPACK_IMPORTED_MODULE_8___namespace =
            /*#__PURE__*/ __webpack_require__.t(
              /*! ../../../dist/medicare-component.tokens.json */ '../../dist/medicare-component.tokens.json',
              1
            );
          /* harmony import */ var _dist_cmsgov_tokens_json__WEBPACK_IMPORTED_MODULE_9__ =
            __webpack_require__(
              /*! ../../../dist/cmsgov.tokens.json */ '../../dist/cmsgov.tokens.json'
            );
          var _dist_cmsgov_tokens_json__WEBPACK_IMPORTED_MODULE_9___namespace =
            /*#__PURE__*/ __webpack_require__.t(
              /*! ../../../dist/cmsgov.tokens.json */ '../../dist/cmsgov.tokens.json',
              1
            );
          /* harmony import */ var _dist_cmsgov_component_tokens_json__WEBPACK_IMPORTED_MODULE_10__ =
            __webpack_require__(
              /*! ../../../dist/cmsgov-component.tokens.json */ '../../dist/cmsgov-component.tokens.json'
            );
          var _dist_cmsgov_component_tokens_json__WEBPACK_IMPORTED_MODULE_10___namespace =
            /*#__PURE__*/ __webpack_require__.t(
              /*! ../../../dist/cmsgov-component.tokens.json */ '../../dist/cmsgov-component.tokens.json',
              1
            );
          function _slicedToArray(arr, i) {
            return (
              _arrayWithHoles(arr) ||
              _iterableToArrayLimit(arr, i) ||
              _unsupportedIterableToArray(arr, i) ||
              _nonIterableRest()
            );
          }

          function _nonIterableRest() {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
          }

          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === 'Object' && o.constructor) n = o.constructor.name;
            if (n === 'Map' || n === 'Set') return Array.from(o);
            if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
              return _arrayLikeToArray(o, minLen);
          }

          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }

          function _iterableToArrayLimit(arr, i) {
            var _i =
              arr == null
                ? null
                : (typeof Symbol !== 'undefined' && arr[Symbol.iterator]) || arr['@@iterator'];
            if (_i == null) return;
            var _arr = [];
            var _n = true;
            var _d = false;
            var _s, _e;
            try {
              for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i['return'] != null) _i['return']();
              } finally {
                if (_d) throw _e;
              }
            }
            return _arr;
          }

          function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
          }

          var tokensByTheme = {
            core: {
              themeColors: _dist_core_tokens_json__WEBPACK_IMPORTED_MODULE_3__.color,
              components: _dist_core_component_tokens_json__WEBPACK_IMPORTED_MODULE_4__,
            },
            healthcare: {
              themeColors: _dist_healthcare_tokens_json__WEBPACK_IMPORTED_MODULE_5__.color,
              components: _dist_healthcare_component_tokens_json__WEBPACK_IMPORTED_MODULE_6__,
            },
            medicare: {
              themeColors: _dist_medicare_tokens_json__WEBPACK_IMPORTED_MODULE_7__.color,
              components: _dist_medicare_component_tokens_json__WEBPACK_IMPORTED_MODULE_8__,
            },
            cmsgov: {
              themeColors: _dist_cmsgov_tokens_json__WEBPACK_IMPORTED_MODULE_9__.color,
              components: _dist_cmsgov_component_tokens_json__WEBPACK_IMPORTED_MODULE_10__,
            },
          };

          function loadSwatchMap(doc) {
            return doc.swatches.reduce(function (map, swatch) {
              map[swatch.name] = swatch;
              return map;
            }, {});
          }

          function saveSwatchMap(doc, swatchMap) {
            // Update all references to the swatches in the doc
            var swatchContainer = doc.sketchObject.documentData().sharedSwatches();
            doc.swatches.forEach(function (swatch) {
              swatchContainer.updateReferencesToSwatch(swatch.sketchObject);
            }); // For some reason, the above code isn't enough. I also need to find and replace all
            // swatch references in the doc. Only both of these solutions together seems to work
            // doc.pages.forEach((page) => {
            //   page.layers.forEach((layer) => {
            //     // Check if the layer has a fill or a border
            //     if (layer.style && (layer.style.fills || layer.style.borders)) {
            //       // Iterate through the fills and borders of the layer
            //       [...(layer.style.fills || []), ...(layer.style.borders || [])].forEach((style) => {
            //         // Check if the fill or border has a swatch with the oldSwatchName
            //         // console.log(style.fillType)
            //         // console.log(style)
            //         console.log('swatch', style.swatch);
            //         // The following code throws errors in the console, and yet without it the
            //         // swatches don't get updated
            //         if (style.fillType === Swatch) {
            //           // Replace the swatch with the newSwatchName
            //           style.swatch = swatchMap[style.swatch.name];
            //         }
            //       });
            //     }
            //   });
            // });
            // doc.swatches = Object.values(swatchMap);
            // doc.sketchObject.reloadInspector(); // Refresh the Sketch inspector
          }

          function updateOrAddSwatch(swatchMap, name, color) {
            var newSwatch = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.Swatch.from({
              name: name,
              color: color,
            });

            if (swatchMap[name]) {
              // The only other way I know to supply the Sketch's low-level `updateWithColor`
              // is with `MSColor.colorWithHex_alpha("#0094FF", 1)`, but the problem is that right
              // now all our color tokens are defined with the alpha channel in the hexadecimal,
              // and I don't want to bother with parsing it out, so I'm just going to create a new
              // swatch every time.
              swatchMap[name].sketchObject.updateWithColor(newSwatch.referencingColor);
            } else {
              swatchMap[name] = newSwatch;
            }
          }

          function updateSwatchesFromTheme(doc, themeTokens) {
            var swatchMap = loadSwatchMap(doc);

            for (
              var _i = 0, _Object$entries = Object.entries(themeTokens.themeColors);
              _i < _Object$entries.length;
              _i++
            ) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];

              // The name of the color is what comes before the first hyphen (if there's a hyphen)
              var colorName = key.split('-')[0];
              var swatchName = 'theme colors/'.concat(colorName, '/').concat(key);
              updateOrAddSwatch(swatchMap, swatchName, value);
            }

            var hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

            for (
              var _i2 = 0, _Object$entries2 = Object.entries(themeTokens.components);
              _i2 < _Object$entries2.length;
              _i2++
            ) {
              var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                componentName = _Object$entries2$_i[0],
                componentTokens = _Object$entries2$_i[1];

              for (
                var _i3 = 0, _Object$entries3 = Object.entries(componentTokens);
                _i3 < _Object$entries3.length;
                _i3++
              ) {
                var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
                  tokenName = _Object$entries3$_i[0],
                  tokenValue = _Object$entries3$_i[1];

                if (hexRegex.test(tokenValue)) {
                  var _swatchName = 'components/'
                    .concat(componentName, '/')
                    .concat(componentName)
                    .concat(tokenName);

                  updateOrAddSwatch(swatchMap, _swatchName, tokenValue);
                }
              }
            }

            saveSwatchMap(doc, swatchMap);
          }

          /* harmony default export */ __webpack_exports__['default'] = function () {
            var themeNames = Object.values(_themes_json__WEBPACK_IMPORTED_MODULE_2__).map(function (
              theme
            ) {
              return theme.displayName;
            });
            var themeIndex = _skpm_dialog__WEBPACK_IMPORTED_MODULE_1___default.a.showMessageBoxSync(
              {
                title: 'Switch theme',
                message: 'Which theme?',
                buttons: themeNames,
              }
            );
            var themeKey = Object.keys(_themes_json__WEBPACK_IMPORTED_MODULE_2__)[themeIndex];
            var themeName = _themes_json__WEBPACK_IMPORTED_MODULE_2__[themeKey].displayName;
            var themeTokens = tokensByTheme[themeKey];
            var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
            updateSwatchesFromTheme(doc, themeTokens);
            sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message(
              'Switched to '.concat(themeName)
            );
          };

          /***/
        },

      /***/ sketch:
        /*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
        /*! no static exports found */
        /***/ function (module, exports) {
          module.exports = require('sketch');

          /***/
        },

      /******/
    }
  );
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default');

//# sourceMappingURL=json-token-importer.js.map
