import { useCloudStorage } from '@vikadata/widget-sdk';
import React from 'react';
import { Setting } from './setting';

export const Information: React.FC = () => {
  const [text] =useCloudStorage<[string, string][]>('text')

  if(text){
    return (
      <div style={{width:"100%", height: "100%"}}>
          {/* <iframe style={{width:"100%", height: "100%"}} id="myframe" src="https://vika.cn/share/shrgByGAhB9gbVrsKv6K5" name="myframe"> */}
          <iframe style={{width:"100%", height: "100%"}} id="myframe" src={text} name="myframe">
          </iframe>
          
      </div>
    );
  }else{
    return(
      <div style={{width:"100%", height: "100%", fontSize: "1.6em", color: "#696969", backgroundColor: "rgb(245, 245, 245)", paddingLeft: '14px', paddingRight: '14px', alignContent: "center", justifyContent: "center", alignItems: "center", display: "flex"}}>请展开小程序，在右侧配置区输入 URL</div>
    );
  }
};

// (3条消息) 嵌入网页，调整内容的大小_雨果的博客-CSDN博客
// https://blog.csdn.net/qq_39019865/article/details/79022005

// iframe 在线测试器
// http://www.html521.com/try/try.php?filename=tryjsref_iframe_name

// 1. 支持在 settings 输入一个 url，修改一个 url（每张表支持最多绑 1 个 url）
// 2. 输入后的url可以保存，即退出小程序后也会留存状态
