/*
 * Medicare.gov CMSDS Component Theme
 */

import { default as t } from './medicare'
import { hexOpacity } from '../lib/utility'
import { AllTokenValues } from '../lib/types'

export const components: AllTokenValues = {
  'alert': {
    '__background-color':                         t.color['primary-alt-lightest'],
    '__background-color--error':                  t.color['error-lightest'],
    '__background-color--lightweight':            t.color['white'],
    '__background-color--success':                t.color['success-lightest'],
    '__background-color--warn':                   t.color['warn-lightest'],
    '__bar-width':                                t.spacer['1'],
    '__border-left-color':                        t.color['primary-alt'],
    '__border-color--error':                      t.color['error'],
    '__border-color--success':                    t.color['success'],
    '__border-color--warn':                       t.color['warn'],
    '__font-color':                               t.color['base'],
    '__icon-size':                                t.spacer['5'],
    '__padding':                                  t.spacer['2'],
    '-link__font-color':                          t.color['primary-alt'],
    '-link__font-color--hover':                   t.color['primary-alt-dark'],
    '-link__font-color--focus':                   t.color['primary-alt-darkest'],
    '-link__font-color--active':                  t.color['primary-alt-darkest'],
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
    '__font-color':                               t.color['white'],
    '__background-color--alert':                  t.color['error'],
    '__background-color--info':                   t.color['primary'],
    '__background-color--success':                t.color['success'],
    '__background-color--warn':                   t.color['warn'],
    '__font-color--warn':                         t.color['base'],
    '__border-radius':                            t.radius['pill'],
  },
  
  'button': {
    '__border-radius':                            t.radius['medium'],
    '__border-width':                             '1px',
    '__background-color':                         t.color['white'],
    '__background-color--active':                 t.color['white'],
    '__background-color--disabled':               t.color['white'],
    '__background-color--hover':                  t.color['primary-darker'],
    '__border-color':                             t.color['primary-alt'],
    '__border-color--active':                     t.color['primary-alt-darkest'],
    '__border-color--disabled':                   t.color['gray-lighter'],
    '__border-color--hover':                      t.color['primary-alt-dark'],
    '__color':                                    t.color['primary-alt'],
    '__color--active':                            t.color['primary-darkest'],
    '__color--disabled':                          t.color['gray-lighter'],
    '__color--hover':                             t.color['primary-alt-dark'],
    '-icon__fill':                                t.color['base'], // medicare  only
  },
  
  'button-inverse': {
    '__background-color':                         t.color['background-inverse'],
    '__background-color--disabled':               t.color['background-inverse'],
    '__background-color--focus':                  t.color['background-inverse'],
    '__border-color':                             t.color['white'],
    '__border-color--active':                     hexOpacity(t.color['white'], 60),
    '__border-color--disabled':                   hexOpacity(t.color['white'], 80),
    '__border-color--hover':                      hexOpacity(t.color['white'], 80),
    '__color':                                    t.color['white'],
    '__color--active':                            hexOpacity(t.color['white'], 60),
    '__color--disabled':                          hexOpacity(t.color['white'], 80),
    '__color--hover':                             hexOpacity(t.color['white'], 80),
  },
  
  'button-transparent': {
    '__color--active':                            t.color['primary-darkest'],
    '__background-color--disabled':               t.color['gray-lighter'],
    '__color--disabled':                          t.color['gray-dark'],
  },
  
  'button-inverse-transparent': {
    '__background-color':                         t.color['gray-lighter'],
    '__color':                                    t.color['gray-dark'],
    '__color--disabled':                          t.color['gray-dark'], // medicare  only
  },
  
  'button-primary': {
    '__color':                                    t.color['white'], // medicare  only
    '__color--hover':                             t.color['white'], // medicare  only
    '__background-color':                         t.color['primary'],
    '__background-color--hover':                  t.color['primary-dark'],
    '__background-color--focus':                  t.color['primary'], // medicare  only
    '__background-color--active':                 t.color['primary-light'],
  },
  
  'button-primary-inverse': {
    '__background-color':                         t.color['white'],
    '__border-color':                             t.color['gray-dark'],
    '__color':                                    t.color['gray-dark'],
    '__background-color--hover':                  t.color['white'],
    '__border-color--hover':                      hexOpacity(t.color['gray-dark'], 80),
    '__color--hover':                             hexOpacity(t.color['gray-dark'], 80),
    '__border-color--active':                     hexOpacity(t.color['gray-dark'], 60),
    '__coloro--active':                           hexOpacity(t.color['gray-dark'], 60),
    '__background-color--focus':                  t.color['white'],
    '__border-color--focus':                      hexOpacity(t.color['gray-dark'], 80),
    '__color--focus':                             hexOpacity(t.color['gray-dark'], 80),
    '__background-color--disabled':               t.color['gray-lighter'],
    '__border-color--disabled':                   t.color['transparent'],
    '__color--disabled':                          t.color['gray-dark'],
    '-transparent__background-color':             t.color['transparent'],
    '-transparent__border-color':                 t.color['transparent'],
    '-transparent__color':                        t.color['white'],
  },
  
  'button-primary-alt': {
    '__color':                                    t.color['white'],
    '__border-color':                             t.color['transparent'],
    '__background-color':                         t.color['primary-alt'],
    '__color--hover':                             t.color['white'],
    '__background-color--hover':                  t.color['primary-alt-dark'],
    '__border-color--hover':                      t.color['primary-alt-dark'],
    '__color--active':                            t.color['white'],
    '__background-color--active':                 t.color['primary-alt-light'],
    '__border-color--active':                     t.color['primary-alt-light'],
  },
  
  'choice': {
    '__background-color':                         t.color['background'],
    '__background-color--checked':                t.color['primary-alt'],
    '__background-color--disabled':               t.color['gray-lighter'],
    '__background-color--inverse':                t.color['transparent'],
    '__background-color--disabled--inverse':      hexOpacity(t.color['muted-inverse'], 15),
    '__border-color':                             t.color['gray'],
    '__border-color--checked':                    t.color['primary-alt'],
    '__border-color--disabled':                   t.color['gray-medium-light'],
    '__border-color--error':                      t.color['error'],
    '__border-color--inverse':                    t.color['white'],
    '__border-color--left':                       t.color['primary'],
    '__border-color--focus':                      t.color['primary-darker'],
    '__border-color--disabled--inverse':          t.color['gray-medium-light'],
    '__border-radius':                            t.radius['default'],
    '__border-width':                             '2px',
    '__color--unchecked':                         t.color['white'],
    '__color--disabled':                          t.color['muted'],
    '__size':                                     t.spacer['3'],
    '__size--small':                              '20px',
    '__size-radio':                               t.spacer['2'],
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
    '-toggle__color--hover--inverse':             t.color['gray-darker'],
  },
  
  'dropdown': {
    '__background-color':                         t.color['white'],
    '__icon-size':                                '10px',
  },
  
  'filter-chip': {
    '__border-radius':                            t.radius.pill,
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
    '-label__color--not-error':                   t.color['gray-light'], // medicare  only
    '__max-width':                                '460px',
    '__max-width--small':                         '6em',
    '__max-width--medium':                        '12em',
    '-hint__color':                               t.color['muted'],
    '-hint__color--inverse':                      t.color['muted-inverse'],
    '-error__color':                              t.color['error'],
    '-error__color--inverse':                     t.color['error-light'],
  },
  
  'link': {
    '__color':                                    t.color['primary-alt'],
    '__color--visited':                           t.color['visited'],
    '__color--hover':                             t.color['primary-alt-dark'],
    '__color--active':                            t.color['primary-alt-dark'],
    '-inverse__color':                            t.color['base-inverse'],
    '-inverse__color--visited':                   t.color['gray-lighter'],
    '-inverse__color--hover':                     t.color['gray-lighter'],
    '-inverse__color--status':                    t.color['gray-lighter'],
    '__text-decoration--thickness':               '1px',
    '__text-decoration--thickness--hover':        '2px',
    '__text-decoration--offset':                  '3px',
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
    'review__border-color':                       t.color['border'],
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
  
  'text-input': {
    '__line-height':                              '1.3',
    '__background-color--disabled':               t.color['gray-lighter'],
    '__border-width':                             '2px',
    '__border-color':                             t.color['gray-light'],
    '__border-color--disabled':                   t.color['gray-warm-dark'],
    '__border-color--error':                      t.color['error'],
    '__border-color--error--inverse':             t.color['error-light'],
    '__border-color--inverse':                    t.color['black'],
    '__border-color--success':                    t.color['success-light'],
    '__color':                                    t.color['gray-warm-dark'],
    '__padding':                                  t.spacer['1'],
    '__border-radius':                            '0',
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
}

export default components
