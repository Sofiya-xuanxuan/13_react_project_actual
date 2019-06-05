import {Layout, Menu, Badge, Icon, Dropdown} from 'antd';
import Link from 'umi/link';
import styles from './index.css'
import {connect} from 'dva';

const {Header, Footer, Content} = Layout;
export default connect(state => ({
    cart: state.cart,
    count: state.cart.length
}))(function (props) {
    const pathname = props.location.pathname;

    console.log(props.cart);
    const dropmenu = (
        <Menu>
            {
                props.cart.map((item, index) => (
                    <Menu.Item key={index}>
                        {item.name} x {item.count}
                        <span>￥{item.count * item.price}</span>
                    </Menu.Item>
                ))
            }
        </Menu>
    )

    const menu = [
        {path: '/', name: '商品'},
        {path: '/users', name: '用户'},
        {path: '/about', name: '关于'},
    ];

    const selectedKeys = menu.filter(menu => {
        if (menu.path === '/') {
            return pathname === '/'
        }
        return pathname.indexOf(menu.path) !== -1;
    }).map(menu => menu.path);

    return (
        <Layout>
            {/*页头*/}
            <Header className={styles.header}>
                <img src="https://img.kaikeba.com/logo-new.png" className={styles.logo}/>
                <Menu theme='dark' selectedKeys={selectedKeys} style={{lineHeight: '64px', float: 'left'}}
                      mode="horizontal">
                    {menu.map(menu =>
                        <Menu.Item key={menu.path}>
                            <Link to={menu.path}>{menu.name}</Link>
                        </Menu.Item>
                    )}
                </Menu>
                <Dropdown overlay={dropmenu} placement={'bottomRight'}>
                    <div style={{float: "right"}}>
                        <Icon type='shopping-cart' style={{fontSize: 18}}></Icon>
                        <span>我的购物车</span>
                        <Badge count={props.count} offset={[-4, -18]}></Badge>
                    </div>
                </Dropdown>
            </Header>
            {/*内容*/}
            <Content className={styles.content}>
                <div className={styles.box}>{props.children}</div>
            </Content>
            {/*页脚*/}
            <Footer className={styles.footer}>开课吧</Footer>
        </Layout>
    )
})
