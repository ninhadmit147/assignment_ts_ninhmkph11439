import Navigo from 'navigo'
import './index.css'
import Admin from './page/admin';
import AddProd from './page/admin/addProd';
import UpdateProd from './page/admin/updateProd';
import HomePage from './page/homePgae';

const router = new Navigo('/', { linksSelector: "a" });

export type ComponetBase = {
  render: (id: any) => Promise<string>
  afterRender?: () => void
}

const print = async (component: ComponetBase, id: ComponetBase, params?: any) => {
  document.getElementById('app').innerHTML = await component.render(id)
  if (component.afterRender) {
    component.afterRender(id)
  }
}

router.on({
  '/': () => print(HomePage),
  '/admin/products': () => print(Admin),
  '/admin/product/add': () => print(AddProd),
  '/admin/product/:id/update': (data: any) => {
    const id = +data.data.id
    print(UpdateProd, id)
  },
  //   ?category': (data: any) => {
  //     const id = +data.params.id
  //     console.log(id);

  // }


})

router.resolve()