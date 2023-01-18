import { FallingLines } from 'react-loader-spinner';
import css from './Loading.module.css';

function Loading() {
  return (
    <div className={css.loading}>
      <FallingLines
        color="#2802ff"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
}

export default Loading;
