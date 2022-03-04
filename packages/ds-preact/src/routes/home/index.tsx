import { FunctionalComponent, h } from 'preact';
import Alert from '../../components/alert';
import style from './style.css';

const Home: FunctionalComponent = () => {
    return (
        <div class={style.home}>
            <Alert heading="Foo" variation="error">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, dolorum! Perferendis, quam cum. Ducimus officia necessitatibus officiis? Praesentium mollitia cupiditate numquam atque, doloremque, aliquid et eligendi consequuntur laudantium architecto eos?</Alert>
            {/* <cms-alert>Testing things out</cms-alert> */}
        </div>
    );
};

export default Home;
