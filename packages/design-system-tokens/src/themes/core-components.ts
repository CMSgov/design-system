/*
 * Core CMSDS Component Theme
 */

import { default as t } from './core'
import { hexOpacity } from '../lib/utility'
import { AnyTokenValues } from '../lib/types'

export const components: AnyTokenValues = {
  'alert': {
    '__background-color':                         t.color['primary-alt-lightest'],
    '__background-color--error':                  t.color['error-lightest'],
    '__background-color--lightweight':            t.color['white'],
    '__background-color--success':                t.color['success-lightest'],
    '__background-color--warn':                   t.color['warn-lightest'],
    '__border-left-color':                        t.color['primary-alt'],
    '__border-color--error':                      t.color['error'],
    '__border-color--success':                    t.color['success'],
    '__border-color--warn':                       t.color['warn'],
    '__font-color':                               t.color['base'],
    '__icon-size':                                t.spacer['5'],
    '__padding':                                  t.spacer['2'],
    '-bar__width':                                t.spacer['1'],
    '-link__font-color':                          t.color['primary-darker'],
    '-link__font-color--hover':                   t.color['primary-darkest'],
    '-link__font-color--focus':                   t.color['primary-darkest'],
    '-link__font-color--active':                  t.color['primary-darkest'],
  },

  'autocomplete': {
    '__background-color':                         t.color['white'],
    '__border-color':                             t.color['gray-lighter'],
    '-item__font-color':                          t.color['primary'],
    '-item__background-color--active':            t.color['primary-alt-darkest'],
    '-item__font-color--active':                  t.color['white'],
    '-item-message__font-color':                  t.color['muted'],
  },

  'badge': {
    '__background-color':                         t.color['gray'],
    '__background-color--alert':                  t.color['error'],
    '__background-color--info':                   t.color['primary'],
    '__background-color--success':                t.color['success'],
    '__background-color--warn':                   t.color['warn'],
    '__font-color':                               t.color['white'],
    '__font-color--warn':                         t.color['base'],
  },

  'button': {
    '__border-radius':                            t.radius['default'],
    '__border-width':                             '1px',
    '__background-color':                         t.color['white'],
    '__background-color--active':                 t.color['white'],
    '__background-color--disabled':               t.color['white'],
    '__background-color--hover':                  t.color['primary-darker'],
    '__border-color':                             t.color['primary'],
    '__border-color--active':                     t.color['primary-darkest'],
    '__border-color--disabled':                   t.color['gray-lighter'],
    '__border-color--hover':                      t.color['primary-darker'],
    '__color':                                    t.color['primary'],
    '__color--active':                            t.color['primary-darkest'],
    '__color--disabled':                          t.color['gray-lighter'],
    '__color--hover':                             t.color['primary-darker'],
    '-icon__fill':                                t.color['base'],
  },

  'button-inverse': {
    '__background-color':                         t.color['background-inverse'],
    '__background-color--disabled':               t.color['background-inverse'],
    '__background-color--focus':                  t.color['background-inverse'],
    '__border-color':                             t.color['border-inverse'],
    '__border-color--active':                     hexOpacity(t.color['border-inverse'], 0.6),
    '__border-color--disabled':                   t.color['gray-lighter'],
    '__border-color--hover':                      hexOpacity(t.color['base-inverse'], 0.8),
    '__color':                                    t.color['base-inverse'],
    '__color--active':                            hexOpacity(t.color['base-inverse'], 0.6),
    '__color--disabled':                          t.color['gray-lighter'],
    '__color--hover':                             hexOpacity(t.color['base-inverse'], 0.8),
  },

  'button-transparent': {
    '__color--active':                            t.color['primary-darkest'],
    '__background-color--disabled':               t.color['gray-lighter'],
    '__color--disabled':                          t.color['gray-dark'],
  },

  'button-inverse-transparent': {
    '__background-color':                         t.color['gray-lighter'],
    '__color':                                    t.color['gray-dark'],
    '__color--disabled':                          t.color['gray-dark'], 
  },

  'button-primary': {
    '__color':                                    t.color['white'], 
    '__color--hover':                             t.color['white'], 
    '__background-color':                         t.color['primary'],
    '__background-color--hover':                  t.color['primary-darker'],
    '__background-color--focus':                  t.color['primary'], 
    '__background-color--active':                 t.color['primary-darkest'],
  },

  'choice': {
    '__background-color':                         t.color['background'],
    '__background-color--checked':                t.color['primary'],
    '__background-color--disabled':               t.color['gray-lighter'],
    '__background-color--inverse':                t.color['transparent'],
    '__background-color--disabled--inverse':      hexOpacity(t.color['muted-inverse'], 0.15),
    '__border-color':                             t.color['base'],
    '__border-color--checked':                    t.color['primary'],
    '__border-color--disabled':                   t.color['gray-light'],
    '__border-color--error':                      t.color['error'],
    '__border-color--inverse':                    t.color['white'],
    '__border-color--left':                       t.color['primary'],
    '__border-color--focus':                      t.color['primary-darker'],
    '__border-color--disabled--inverse':          t.color['gray-light'],
    '__border-radius':                            '0px',
    '__border-width':                             '2px',
    '__color--unchecked':                         t.color['white'],
    '__color--disabled':                          t.color['muted'],
    '__size':                                     t.spacer['4'],
    '__size--small':                              '20px',
    '__size-radio':                               '22px',
    '__size-radio--small':                        '12px',
    '-label__color--disabled':                    t.color['muted'],
    '-label__color--disabled--inverse':           t.color['muted-inverse'],
  },

  'dialog': {
    '__background-color':                         t.color['white'],
    '__padding':                                  t.spacer['4'],
    '-overlay__background-color':                 t.color['background-dialog-mask'],
  },

  'drawer': {
    '__animation-timing':                         t.animation['speed-2'],
    '__background-color':                         t.color['background'],
    '__border-color':                             t.color['border'],
    '-close__color':                              t.color['black'],
    '-header__background-color':                  t.color['gray-lightest'],
    '-footer__background-color':                  t.color['primary-alt-lightest'],
    '-toggle__background-color--hover':           t.color['primary-alt'],
    '-toggle__color--hover':                      t.color['white'],
    '-toggle__background-color--hover--inverse':  t.color['white'],
    '-toggle__color--hover--inverse':             t.color['gray-dark'],
  },

  'dropdown': {
    '__background-color':                         t.color['white'],
    '__icon-size':                                '10px',
  },

  'filter-chip': {
    '__border-radius':                            t.radius['pill'],
    '__background-color':                         t.color['primary-alt-lightest'],
    '__border-color':                             t.color['primary'],
    '__color':                                    t.color['base'],
    '__background-color--active':                 t.color['primary'],
    '__border-color--active':                     t.color['primary'],
    '__color--active':                            t.color['white'],
    '-icon__color':                               t.color['base'],
    '-icon__color-active':                        t.color['white'],
  },

  'form': {
    '-label__color--inverse':                     t.color['base-inverse'],
    '__max-width':                                '460px',
    '__max-width--small':                         '6em',
    '__max-width--medium':                        '12em',
    '-hint__color':                               t.color['muted'],
    '-hint__color--inverse':                      t.color['muted-inverse'],
    '-error__color':                              t.color['error'],
    '-error__color--inverse':                     t.color['error-light'],
  },

  'icon': {
    '__color__error':                             t.color['error'],
    '__color--inverse':                           t.color['white'],
    '__color--primary':                           t.color['primary'],
    '__color--success':                           t.color['success'],
    '__color--warn':                              t.color['warn'],
  },

  'link': {
    '__color':                                    t.color['primary'],
    '__color--active':                            t.color['primary-darkest'],
    '__color--hover':                             t.color['primary-darker'],
    '__color--visited':                           t.color['visited'],
    '-inverse__color':                            t.color['base-inverse'],
    '-inverse__color--active':                    t.color['muted-inverse'],
    '-inverse__color--hover':                     t.color['muted-inverse'],
    '-inverse__color--visited':                   t.color['muted-inverse'],
    '__text-decoration-offset':                   'auto',
    '__text-decoration-thickness':                '1px',
    '__text-decoration-thickness--hover':         '1px',
  },

  'pagination': {
    '-link__color':                               t.color['primary'],
    '-link__color--hover':                        t.color['primary-darker'],
    '-link__color--active':                       t.color['primary-darkest'],
    '-link__color--focus':                        t.color['primary-darker'],
    '-link__color--disabled':                     t.color['gray-lighter'],
    '-current-page__color':                       t.color['base'],
    '-overflow__color':                           t.color['gray'],
    '-page-count__color':                         t.color['gray'],
  },

  'review': {
    '__border-color':                             t.color['border'],
  },

  'steplist': {
    '__color':                                    t.color['muted'],
    '__color--current':                           t.color['primary'],
    '__background-color--current':                t.color['primary'],
    '-step__color':                               t.color['muted'],
    '-step__border-color':                        t.color['border'],
    '-step__border-color--default':               t.color['muted'],
    '-step__color--current':                      t.color['white'],
    '-step__color--completed':                    t.color['base'],
    '-step__background-color--completed':         t.color['base'],
  },

  'spinner': {
    '__background-color':                         t.color['background'],
    '__color':                                    t.color['base'],
    '__background-color--inverse':                t.color['background-inverse'],
    '__color--inverse':                           t.color['white'],
  },

  'table': {
    '__padding':                                  t.spacer['2'],
    '__border-color':                             t.color['black'],
    '-header__background-color':                  t.color['gray-lightest'],
    '-striped__background-color':                 t.color['gray-lightest'],
    '-striped-header__background-color':          t.color['gray-lightest'],
  },

  'tabs': {
    '__border-color':                             t.color['border'],
    '__background-color':                         t.color['background'],
    '__color':                                    t.color['base'],
    '-selected__background-color':                t.color['primary'],
    '-selected__border-color':                    t.color['white'],
    '-selected__color':                           t.color['primary'],
    '-selected__border-color--active':            t.color['primary'],
    '__color--hover':                             t.color['primary'],
    '__color--active':                            t.color['primary-darker'],
    '__background-color--disabled':               t.color['gray-lighter'],
    '__border-color--disabled':                   t.color['gray-lighter'],
    '__color--disabled':                          t.color['gray-dark'],
  },

  'text-input': {
    '__line-height':                              '1.3',
    '__background-color--disabled':               t.color['gray-lighter'],
    '__border-width':                             '2px',
    '__border-color':                             t.color['base'],
    '__border-color--disabled':                   t.color['gray-light'],
    '__border-color--error':                      t.color['error'],
    '__border-color--error--inverse':             t.color['error-light'],
    '__border-color--inverse':                    t.color['black'],
    '__border-color--success':                    t.color['success-light'],
    '__color':                                    t.color['base'],
    '__padding':                                  t.spacer['1'],
    '__border-radius':                            t.radius['default'],
  },

  'tooltip': {
    '__background-color':                         t.color['background'],
    '__border-color':                             t.color['gray-dark'],
    '__color':                                    t.color['base'],
    '__box-shadow-color':                         t.color['gray-light'],
    '-icon__color':                               t.color['primary'],
    '-icon__color--inverse':                      t.color['white'],
    '-trigger__color':                            t.color['primary'],
  },

  'usa-banner': {
    '__background-color':                         t.color['gray-lightest'],
    '__color':                                    t.color['black'],
    '-close__background-color':                   t.color['gray-light'],
    '-action__color':                             t.color['primary-darker'],
    '-lock-icon__color':                          t.color['success-light'],
  },

  'vertical-nav': {
    '-item__background-color--hover':             t.color['gray-lightest'],
    '-item__color--hover':                        t.color['primary'],
    '-item__border-color':                        t.color['gray'],
    '-label__color':                              t.color['base'],
    '-label-icon__color':                         t.color['base'],
    '-label__border-color--current':              t.color['primary'],
    '-label__color--current':                     t.color['primary'],
  },
};

export default components
