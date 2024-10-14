import { ref, watch } from 'vue';

export default function useHeaderConfig() {
  const headerConfigList = ref<IConfigItem[]>([])

  // 从 localStorage 初始化数据
  const loadFromLocalStorage = () => {
    chrome.storage.local.get('headerConfigList').then((result) => {
      headerConfigList.value = JSON.parse(result.headerConfigList || '[]');
    });
  };

  // 在组件创建时加载数据
  loadFromLocalStorage();

  // 自动同步到 localStorage
  watch(headerConfigList, (value) => { 
    chrome.storage.local.set({
      headerConfigList: JSON.stringify(value || []) 
    })
  }, { deep: true });

  // 添加配置项
  const addHeaderConfig = () => {
    headerConfigList.value.push({ key: '', value: '', checked: false });
  }

  // 根据索引删除配置项
  const removeHeaderConfig = (index: number) => {
    headerConfigList.value.splice(index, 1);
  }

  return {
    headerConfigList,
    addHeaderConfig,
    removeHeaderConfig
  };
}
