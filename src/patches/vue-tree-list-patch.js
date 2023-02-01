import VueTreeList from 'vue-tree-list/src/VueTreeList.vue'
import { createMoveIcon, debounce } from '@/utils'

export const PatchedList = patchVueTreeList(VueTreeList)

/**
* Hack VueTreeList to install hooks
*/
function patchVueTreeList(VueTreeList)
{
  VueTreeList.methods.updateName = (function(update) {
    return function(e) {
      update.call(this, e)
    }

  })(VueTreeList.methods.updateName)

  /* VueTreeList.methods.moveNode = function({ target }) {
    // some logic...
  } */

  VueTreeList.updated = debounce(function() {
    const operations = document.querySelectorAll('div.vtl-operation')
    const nodes = {}

    operations.forEach((o, i) => {
      nodes[`o${i}`] || (nodes[`o${i}`] = [])

      o.childNodes.forEach((n) => {
        if (n.nodeName === 'SPAN') {
          nodes[`o${i}`].push({ span: n, parent: n.parentElement })
        }
      })
    })

    for (const k in nodes) {
      if (nodes[k].length < 3) {
        const icon = createMoveIcon('bi bi-arrow-down-up')
        nodes[k][0].parent.append(icon)
      }
    }

  }, 500)

  VueTreeList.mounted = (function() {
    let c = 0

    return function() {
      const icon = createMoveIcon('bi bi-arrow-down-up')

      document.querySelectorAll('div.vtl-operation')[c++]
        ?.insertAdjacentElement(
          'beforeend',
          icon
        )
    }
  })()

  VueTreeList.methods.dragEnter = (function(enter) {
    return function(e) {
      enter.call(this)

      if (!this.model.isLeaf && e.target.classList.contains('test')) {
        // do something...
      }
    }

  })(VueTreeList.methods.dragEnter)

  VueTreeList.methods.filter = function(str, children) {
    children || (children = this.model.children)

    const dump = []

    for (const treeNode of children) {
      if (treeNode.name === 'root') continue

      let includes = `${treeNode.name} ${treeNode.sub}`.toLowerCase().includes(str),
        show = false

      if (treeNode.children?.length) {
        show = this.filter(str, treeNode.children)
      }

      treeNode.show = includes || show

      document.getElementById(treeNode.id)
        .style.display = treeNode.show
        ? 'block'
        : 'none'

      dump.push(treeNode.show)
    }

    return dump.filter(Boolean).length
  }

  return VueTreeList
}
