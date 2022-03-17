import { useCloudStorage, useActiveCell, CellValue, useRecord, useField, useActiveViewId, FieldType, ICell, useSettingsButton } from '@vikadata/widget-sdk';
import React from 'react';

export const Information: React.FC = () => {
  // const [text] =useCloudStorage<[string, string][]>('text')
  const activeCell = useActiveCell();
  const activeRecord = useRecord(activeCell?.recordId);
  const activeField = useField(activeCell?.fieldId);
  const [text, setText] = useCloudStorage('text', '');
  const [tab, setTab] = useCloudStorage('tab');

  let defaultTip = "";
  if (!activeCell || !activeRecord) {
    defaultTip = "请激活表中的一个网址类型的单元格"
  }else if( activeField?.type != FieldType.URL){
    defaultTip = "请激活一个网址类型的单元格"
  }else if(activeField?.type == FieldType.URL && !activeRecord.getCellValueString(activeCell.fieldId)){
    defaultTip = "当前激活的网址单元格为空"
  }else{
    if (activeCell.fieldId && tab == "2"){
      const activeCellString = activeRecord.getCellValueString(activeCell.fieldId) || "";
      setText(activeCellString);
    }
    defaultTip = "请激活表中的一个网址类型的单元格"
  }

  return (
    <div style={{width:"100%", height: "100%"}} >
      {/* <ActiveCell /> */}
        {
          text ? 
          <iframe style={{width:"100%", height: "100%", border: 0}} id="myframe" src={text} name="myframe" /> 
          : !text && tab =="2" ?
          <div style={{width:"100%", height: "100%", fontSize: "1.6em", color: "#696969", backgroundColor: "rgb(245, 245, 245)", paddingLeft: '14px', paddingRight: '14px', alignContent: "center", justifyContent: "center", alignItems: "center", display: "flex"}}> {defaultTip} </div>
          : <div style={{width:"100%", height: "100%", fontSize: "1.6em", color: "#696969", backgroundColor: "rgb(245, 245, 245)", paddingLeft: '14px', paddingRight: '14px', alignContent: "center", justifyContent: "center", alignItems: "center", display: "flex"}}>请展开小程序，在右侧配置区指定网址</div>
        }
    </div>
  );
};

// 渲染当前选中单元格的值
// function ActiveCell() {
//   const activeCell = useActiveCell();
//   const activeRecord = useRecord(activeCell?.recordId);
//   const activeField = useField(activeCell?.fieldId);
//   const [text, setText] = useCloudStorage('text', '');
//   const [tab, setTab] = useCloudStorage('tab');
//   console.log("activeRecord");
//   console.log(activeRecord);
//   console.log(activeField);
//   console.log(activeCell);

//   if (!activeCell || !activeRecord) {
//     return <p>请激活表中的一个网址类型的单元格</p>
//   }else if( activeField?.type != FieldType.URL){
//     return <p>请激活一个网址类型的单元格</p>
//   }else{
//     if (activeCell.fieldId && tab == "2"){
//       const activeCellString = activeRecord.getCellValueString(activeCell.fieldId) || "请激活表中的一个网址类型的单元格";
//       setText(activeCellString);
//       console.log(activeCellString);
//       return <p>{activeCellString}</p>
//     }
//     return <p>请激活表中的一个网址类型的单元格</p>
//   }
// }

// (3条消息) 嵌入网页，调整内容的大小_雨果的博客-CSDN博客
// https://blog.csdn.net/qq_39019865/article/details/79022005

// iframe 在线测试器
// http://www.html521.com/try/try.php?filename=tryjsref_iframe_name

// 1. 支持在 settings 输入一个 url，修改一个 url（每张表支持最多绑 1 个 url）
// 2. 输入后的url可以保存，即退出小程序后也会留存状态