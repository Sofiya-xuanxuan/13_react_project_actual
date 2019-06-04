import {Layout, Menu} from 'antd';
import Link from 'umi/link';
import styles from './index.css'

const {Header, Footer, Content} = Layout;
export default function (props) {
    const pathname = props.location.pathname;

    console.log(pathname);
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
            </Header>
            {/*内容*/}
            <Content className={styles.content}>
                <div className={styles.box}>{props.children}</div>
            </Content>
            {/*页脚*/}
            <Footer className={styles.footer}>开课吧</Footer>
        </Layout>
    )
}
