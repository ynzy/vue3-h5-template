import { App as VM } from 'vue'
import { Button, Cell, CellGroup, Icon, Tabbar, TabbarItem, Image as VanImage } from 'vant'

const plugins = [Button, Icon, Cell, CellGroup, Tabbar, TabbarItem, VanImage]

export const vantPlugins = {
  install: function(vm: VM) {
    plugins.forEach((item) => {
      vm.component(item.name, item)
    })
  }
}
