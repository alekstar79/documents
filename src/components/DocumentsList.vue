<template>
  <div class="container">
    <section class="row">
      <div class="col-12">
        <nav class="navbar navbar-light bg-light mb-3">
          <div class="container-fluid">
            <span class="navbar-brand">Документы</span>

            <div class="navbar ms-auto my-0">
              <button
                class="btn btn-outline-secondary rounded-pill mx-1 my-1"
                @click="addType"
              >
                <span> + </span> Новый тип
              </button>
              <button
                class="btn btn-outline-secondary rounded-pill mx-1 my-1"
                @click="addNode"
              >
                <span> + </span> Новый документ
              </button>
            </div>
          </div>
        </nav>

        <nav class="navbar navbar-light bg-light py-2">
          <div class="container-fluid">
              <div class="search form-control" ref="search">
                <i class="bi bi-search pe-2 py-1"></i>
                <input type="search" placeholder="Поиск" aria-label="search">
                <div class="clear">
                  <i class="bi bi-x-lg"></i>
                </div>
              </div>
          </div>
        </nav>
      </div>
    </section>

    <section class="row my-5">
      <div class="col-12" :key="updateTypeList">
        <vue-tree-list
          default-tree-node-name="Новый тип"
          default-leaf-node-name="Новый документ"
          @change-name="onChangeName"
          @delete-node="onDeleteNode"
          @drop-before="onDropBefore"
          @add-node="onAddNode"
          @drop="drop"
          ref="tree"
          v-bind="{
            defaultExpanded: true,
            model: tree
          }"
        >
          <template #leafNameDisplay="{ model }">
            <span class="leaf__name" v-html="`
              <span class='leaf__name--normal'>${model.name}</span>
              ${model.sep || ''}
              <span class='leaf__name--small'>${model.sub}</span>
            `"/>
          </template>

          <span class="icon" slot="editNodeIcon">
            <i class="bi bi-pencil"></i>
          </span>

          <span class="icon" slot="delNodeIcon">
            <i class="bi bi-trash"></i>
          </span>

          <span class="icon" slot="leafNodeIcon" v-text="''" />
          <span class="icon" slot="treeNodeIcon" v-text="''" />
        </vue-tree-list>
      </div>
    </section>

    <section class="row my-5">
      <div class="col-12" :key="updateDocsList">
        <vue-tree-list
          default-tree-node-name="Новый тип"
          default-leaf-node-name="Новый документ"
          @change-name="onChangeName"
          @delete-node="onDeleteNode"
          @drop-before="onDropBefore"
          @drop="drop"
          ref="leaf"
          v-bind="{
            defaultExpanded: true,
            model: leaf
          }"
        >
          <template #leafNameDisplay="{ model }">
            <span class="leaf__name" v-html="`
              <span class='leaf__name--normal'>${model.name}</span>
              ${model.sep || ''}
              <span class='leaf__name--small'>${model.sub}</span>
            `"/>
          </template>

          <span class="icon" slot="editNodeIcon">
            <i class="bi bi-pencil"></i>
          </span>

          <span class="icon" slot="delNodeIcon">
            <i class="bi bi-trash"></i>
          </span>

          <span class="icon" slot="leafNodeIcon" v-text="''" />
          <span class="icon" slot="treeNodeIcon" v-text="''" />
        </vue-tree-list>
      </div>
    </section>
  </div>
</template>

<script>
import { Tree, TreeNode } from 'vue-tree-list/src/Tree'
import { PatchedList as VueTreeList } from '@/patches/vue-tree-list-patch.js'
import { createSeparator, rndstring } from '@/utils'

const tree = [{
  show: true,
  addTreeNodeDisabled: true,
  addLeafNodeDisabled: true,
  name: 'Обязательные для всех',
  sub: 'Документы, обязательные для всех сотрудников без исключения',
  sep: createSeparator(['#FF238D','#FFB800','#FF8D23']),
  id: rndstring(13),
  pid: 0,
  children: [{
    show: true,
    isLeaf: true,
    addTreeNodeDisabled: true,
    addLeafNodeDisabled: true,
    name: 'Паспорт',
    sub: 'Обязательный',
    sep: createSeparator(['#00C2FF']),
    id: rndstring(13),
    pid: 1
  },{
    show: true,
    isLeaf: true,
    addTreeNodeDisabled: true,
    addLeafNodeDisabled: true,
    name: 'ИНН',
    sub: 'Обязательный',
    sep: createSeparator({ length: 3 }, ''),
    id: rndstring(13),
    pid: 1
  }]
},{
  show: true,
  addTreeNodeDisabled: true,
  addLeafNodeDisabled: true,
  name: 'Обязательные для трудоустройства',
  sub: 'Документы, без которых невозможно трудоустройство человека',
  sep: createSeparator({ length: 3 }, ''),
  id: rndstring(13),
  pid: 0
},{
  show: true,
  addTreeNodeDisabled: true,
  addLeafNodeDisabled: true,
  name: 'Специальные',
  sub: '',
  id: rndstring(13),
  pid: 0
}]

const leaf = [{
  show: true,
  isLeaf: true,
  addTreeNodeDisabled: true,
  addLeafNodeDisabled: true,
  name: 'Тестовое задание',
  sub: 'Обязательный',
  sep: createSeparator(['#00C2FF']),
  id: rndstring(13)
},{
  show: true,
  isLeaf: true,
  addTreeNodeDisabled: true,
  addLeafNodeDisabled: true,
  name: 'Трудовой договор',
  sub: 'Обязательный',
  sep: createSeparator({ length: 2 }, ''),
  id: rndstring(13)
},{
  show: true,
  isLeaf: true,
  addTreeNodeDisabled: true,
  addLeafNodeDisabled: true,
  name: 'Медкнижка',
  sub: '',
  id: rndstring(13)
}]

export default {
  name: 'DocumentsList',

  components: {
    VueTreeList
  },

  data: () => ({
    updateDocsList: false,
    updateTypeList: false,

    tree: new Tree(tree),
    leaf: new Tree(leaf),

    dump: [
      tree,
      leaf
    ]
  }),
  methods: {
    filter(str)
    {
      this.$refs.tree.filter(str)
      this.$refs.leaf.filter(str)
    },
    async addNode()
    {
      this.leaf.addChildren(
        new TreeNode({
          isLeaf: true,
          parent: this.leaf,
          addTreeNodeDisabled: true,
          addLeafNodeDisabled: true,
          name: 'Новый документ',
          id: rndstring(13),
          sub: '',
          pid: 0
        })
      )

      await this.$nextTick()
      this.updateDocsList = !this.updateDocsList
      this.$forceUpdate()
    },
    async addType()
    {
      this.tree.addChildren(
        new TreeNode({
          isLeaf: false,
          parent: this.tree,
          addTreeNodeDisabled: true,
          addLeafNodeDisabled: true,
          name: 'Новый тип',
          id: rndstring(13),
          sub: '',
          pid: 0
        })
      )

      await this.$nextTick()
      this.updateTypeList = !this.updateTypeList
      this.$forceUpdate()
    },
    async drop({ node, target, src })
    {
      if ((!node.isLeaf && !target.isLeaf) || (node.isLeaf && this.parent?.name === 'root')) {
        node.moveInto(src)
      }
    },
    async onDropBefore({ node, target, src })
    {
      if ((!node.isLeaf && !target.isLeaf) || (node.isLeaf && this.parent?.name === 'root')) {
        node.moveInto(src)
      }
    },
    onAddNode(params)
    {
      // console.log(params)
    },
    onChangeName(params)
    {
      // console.log(params)
    },
    onDeleteNode(node)
    {
      node.remove()
    }
  },
  async mounted()
  {
    await this.$nextTick()

    const { children } = this.$refs.search

    const input = children[1]
    const clear = children[2]

    input.addEventListener('input', ({ target: { value } }) => {
      clear.style.visibility = value.length > 0 ? 'visible' : 'hidden'
      this.filter(value.toLowerCase())
    })

    clear.addEventListener('click', () => {
      clear.previousElementSibling.value = ''
      clear.style.visibility = 'hidden';

      [
        ...document.querySelectorAll('.vtl-leaf-node'),
        ...document.querySelectorAll('.vtl-tree-node')
      ].forEach(el => {
        el.style.display = 'block'
      })
    })
  }
}
</script>

<style lang="scss">
.container {
  .navbar {
    --bs-navbar-brand-color: #576b80;

    &:not(:last-child) {
      --bs-navbar-padding-y: 0.2rem;
    }

    .search {
      display: flex;
      align-items: center;
      font-size: 18px;

      input[type='search'] {
        width: 100%;
        padding-right:20px;

        outline: none;
        border: none;
      }
      input[type="search"]:focus::placeholder {
        opacity: 0;
      }
      input[type="search"]::-webkit-search-decoration,
      input[type="search"]::-webkit-search-cancel-button,
      input[type="search"]::-webkit-search-results-button,
      input[type="search"]::-webkit-search-results-decoration {
        -webkit-appearance: none;
      }

      .bi-search {
        color: var(--bs-navbar-brand-color);
        background-color: #fff;
      }
      .clear {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 26px;

        border-radius: 50%;
        visibility: hidden;
        cursor: pointer;

        &:hover {
          background-color: rgba(240, 242, 244, 1);
        }
      }
    }
    .btn-outline-secondary {
      --bs-btn-color: #576b80;
      --bs-btn-border-color: #576b80;
      --bs-btn-hover-color: #fff;
      --bs-btn-hover-bg: #576b80;
      --bs-btn-hover-border-color: #576b80;
      --bs-btn-active-color: #fff;
      --bs-btn-active-bg: #576b80;
      --bs-btn-active-border-color: #576b80;
    }
    .navbar-brand:hover,
    .navbar-brand:focus {
      color: unset;
    }
  }
  .vtl-node {
    .vtl-node-main {
      display: flex;

      margin-top: -1px;
      padding: 12px;
      height: 64px;

      border: 1px solid #7790a9;

      &.vtl-active {
        border-style: solid;
        border-color: red;
        border-width: 3px;

        outline: none;
      }

      .vtl-caret {
        margin-left: unset;

        .vtl-icon-caret {
          &-right,
          &-down {
            cursor: pointer;
          }
        }
      }
      .vtl-node-content {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        .leaf__name {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .leaf__sep {
            font-size: 26px;
          }

          &--small {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          & > span {
            padding: 3px;
          }
        }
      }
      .vtl-operation {
        margin-left: auto;
        min-width: 76px;

        [title] {
          display: inline-block;
          height: 25px;
          width: 25px;

          margin-right: 0;
        }
        [title="edit"]:hover {
          color: rgba(30, 209, 54, .8);
        }
        [title="delete"]:hover {
          color: rgba(196, 53, 67, .8);
        }
        [title="move"]:hover {
          color: rgba(17, 76, 223, .8);
        }

        .icon {
          cursor: pointer;
          font-size: 18px;
          margin: 3px;
        }
      }
      .vtl-input {
        height: 30px;
      }
    }
    .vtl-border {
      height: 7px;

      &.vtl-up {
        margin-top: -7px;
      }
      &.vtl-active {
        border-bottom-style: solid;
        border-bottom-width: 7px;
      }
    }
  }
}
</style>
