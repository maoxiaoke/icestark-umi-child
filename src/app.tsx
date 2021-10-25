import ReactDOM from 'react-dom';
import { isInIcestark, getMountNode, registerAppEnter, registerAppLeave } from '@ice/stark-app';

// [icestark]: 在 icestark 中修改渲染的节点
export function modifyClientRenderOpts(memo: any) {
  return {
    ...memo,
    rootElement: isInIcestark() ? getMountNode() : memo.rootElement
  };
}

// [icestark]: 为 icestark 注册生命周期
export function render (oldRender: any) {
  if (isInIcestark()) {
    registerAppEnter(() => {
      oldRender();
    });
    registerAppLeave(() => {
      ReactDOM.unmountComponentAtNode(getMountNode());
    });
  } else {
    oldRender();
  }
}