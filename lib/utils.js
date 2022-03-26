const ora = require("ora");

// 延迟执行
async function sleep(n) {
  return new Promise((resolve, rejct) => {
    setTimeout(resolve, n);
  });
}

// 等待的loading
async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message);
  spinner.start();
  try {
    let repos = await fn(...args);
    // console.log(repos)
    spinner.succeed();
    return repos;
  } catch (error) {
    spinner.fail("request failed, refetch...");
    await sleep(1000);
    return wrapLoading(fn, message, ...args);
  }
}


module.exports = {
  sleep,
  wrapLoading
}