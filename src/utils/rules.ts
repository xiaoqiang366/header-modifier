async function updateRules(newRules: chrome.declarativeNetRequest.Rule[]) {
  const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
  const oldRuleIds = oldRules.map(rule => rule.id);

  // Use the arrays to update the dynamic rules
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: oldRuleIds,
    addRules: newRules
  }, () => {
    if (chrome.runtime.lastError) {
      console.log('更新规则 异常！！！', oldRuleIds, newRules);
      console.error(chrome.runtime.lastError);
    } else {
      console.log('更新规则 成功');
      chrome.declarativeNetRequest.getDynamicRules(rules => console.log(rules));
    }
  });
}


/* function updateRules() {
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
          header: "X-DeclarativeNetRequest-BackgroundSet",
          operation: "set",
          value: "中文值"
        }],
      }
    }],
  };

  chrome.declarativeNetRequest.updateDynamicRules(rules, () => {
    console.log('更新规则');
    
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      chrome.declarativeNetRequest.getDynamicRules(rules => console.log(rules));
    }
  });
} */

function removeRules() {
  const ruleId = 1;

  const rules: any = {
    removeRuleIds: [ruleId],
    addRules: [],
  };

  chrome.declarativeNetRequest.updateDynamicRules(rules, () => {
    console.log('删除规则');
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    } else {
      chrome.declarativeNetRequest.getDynamicRules(rules => console.log(rules));
    }
  });
}

export {
  updateRules,
  removeRules
}