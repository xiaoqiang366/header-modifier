import { ref, watch } from 'vue';

export default function useRunningStatus() {
  const status = ref(false);

  // 从 localStorage 初始化数据
  const loadFromLocalStorage = () => {
    chrome.storage.local.get(["isRunning"]).then((result) => {
      status.value = result.isRunning;
    });
  };

  // 在组件创建时加载数据
  loadFromLocalStorage();

  // 自动同步到 localStorage
  watch(status, () => {
    chrome.storage.local.set({ isRunning: status.value }).then(() => {
      console.log("isRunning saved to localStorage");
    });
  });

  return {
    status,
  };
}