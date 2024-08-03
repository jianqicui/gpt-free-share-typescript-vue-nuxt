import { createApp, defineComponent, h } from 'vue'

import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'
import ConfirmIcon from '@/assets/icons/confirm.svg?skipsvgo'
import CancelIcon from '@/assets/icons/cancel.svg?skipsvgo'

const prettyObject = (msg: any) => {
  const obj = msg

  if (typeof msg !== 'string') {
    msg = JSON.stringify(msg, null, '  ')
  }

  if (msg === '{}') {
    return obj.toString()
  }

  if (msg.startsWith('```json')) {
    return msg
  }

  return ['```json', msg, '```'].join('\n')
}

const showModal = (
  content: any,
  confirmButtonText: string,
  cancelButtonText: string
): Promise<boolean> => {
  return new Promise<boolean>(resolve => {
    const div = document.createElement('div')

    div.style.backgroundColor = '#00000080'
    div.style.width = '100vw'
    div.style.height = '100vh'
    div.style.position = 'fixed'
    div.style.top = '0'
    div.style.left = '0'
    div.style.zIndex = '9999'
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'

    document.body.appendChild(div)

    const modalComponent = defineComponent({
      setup() {
        const closeModal = () => {
          app.unmount()
          div.remove()
        }

        return () =>
          h(
            Modal,
            {
              title: confirmButtonText,
              onClose: closeModal,
              actions: [
                h(
                  Button,
                  {
                    key: 'cancel',
                    text: cancelButtonText,
                    bordered: true,
                    onClick: () => {
                      resolve(false)
                      closeModal()
                    }
                  },
                  {
                    icon: () => h(CancelIcon)
                  }
                ),
                h(
                  Button,
                  {
                    key: 'confirm',
                    text: confirmButtonText,
                    bordered: true,
                    type: 'primary',
                    autoFocus: true,
                    onClick: () => {
                      resolve(true)
                      closeModal()
                    }
                  },
                  {
                    icon: () => h(ConfirmIcon)
                  }
                )
              ]
            },
            {
              default: () => h('div', {}, content)
            }
          )
      }
    })

    const app = createApp(modalComponent)
    app.mount(div)
  })
}

export { prettyObject, showModal }
