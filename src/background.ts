import { updateRules } from './utils/rules';

chrome.runtime.onInstalled.addListener((details) => {
  console.log("Extension installed:", details);
  updateActionInfo();
});

chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === 'headerConfigList' || key === 'isRunning') {
      console.log(oldValue === newValue, oldValue, newValue);
      updateActionInfo();
    }
  }
});

async function updateActionInfo() {
  let { isRunning, headerConfigList } = await chrome.storage.local.get(["isRunning", "headerConfigList"]);
  headerConfigList = JSON.parse(headerConfigList || '[]') as IConfigItem[];

  // 要设置的规则数据
  const availableList  = headerConfigList.filter((item: IConfigItem) => {
    return item.key && item.checked;
  });

  const declarativeNetRequestRules = availableList.map((item: IConfigItem, index: number) => {
    return {
      id: index + 1, // rules 必须从 1 开始
      priority: 1,
      condition: {
        resourceTypes: ["main_frame", "xmlhttprequest"],
      },
      action: {
        type: "modifyHeaders",
        requestHeaders: [{
          header: item.key,
          operation: "set",
          value: encodeURI(item.value)
        }],
      }
    }
  })

  // console.log('isRunning', isRunning);
  // console.log('headerConfigList', headerConfigList);
  updateInfo(isRunning, declarativeNetRequestRules)
}


async function updateInfo(
  status: boolean, 
  rules: chrome.declarativeNetRequest.Rule[] = [],
) {
  if (!status) {
    await updateRules([]); // 清空规则
    updateActionStatus(false); // 设置action状态为未运行
  } else if (!rules.length) {
    await updateRules([]); // 清空规则
    updateActionStatus(false, '0'); // 规则配置为 0
  } else {
    await updateRules(rules);
    updateActionStatus(true, rules.length.toString()); // 设置action状态为运行中
  }
} 

function updateActionStatus(status: boolean, text: string = 'OFF') {
  chrome.action.setBadgeTextColor({
    color: '#FFF'
  })
  if (!status) {
    chrome.action.setIcon({
      path: {
        16: 'icon_disabled/icon16.png',
        32: 'icon_disabled/icon32.png',
        48: 'icon_disabled/icon48.png',
        128: 'icon_disabled/icon128.png'
      }
    })
    chrome.action.setBadgeText({ text: '' });
  } else {
    chrome.action.setIcon({
      path: {
        16: 'icon/icon16.png',
        32: 'icon/icon32.png',
        48: 'icon/icon48.png',
        128: 'icon/icon128.png'
      }
    })
    chrome.action.setBadgeText({ text });
  }
  chrome.action.setBadgeBackgroundColor({
    color: status ? '#55AF7B' : '#EB4537'
  });
} 


/* 
// 设置请求规则
// This file must be placed on the same directory to "manifest.json"
// since below code works as a service worker.

const ruleId = 1;

const rules: any = {
  removeRuleIds: [ruleId],
  addRules: [{
    id: ruleId,
    priority: 1,
    condition: {
      domains: ["www.google.com"],
      resourceTypes: ["main_frame", "xmlhttprequest"],
    },
    action: {
      type: "modifyHeaders",
      requestHeaders: [{
        header: "X-BackgroundSet",
        operation: "set",
        value: "request from background set header"
      }],
    }
  }],
};

chrome.declarativeNetRequest.updateDynamicRules(rules, () => {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
  } else {
    chrome.declarativeNetRequest.getDynamicRules(rules => console.log(rules));
  }
});

// You can use `chrome.declarativeNetRequest.updateSessionRules` instead of `updateDynamicRules`.
// If you use it, the rules are not persisted across browser sessions.
//   ==> https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-updateSessionRules
//
// Use `getSessionRules` in order to get session-scoped rules.
//   ==> https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/#method-getSessionRules

*/