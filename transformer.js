var svgr = require("@svgr/core").default;

upstreamTransformer = require("metro/src/reactNativeTransformer");

function xlinkHrefToHref(svgrOutput) {
  return svgrOutput.replace(/xlinkHref=/g, "href=");
}

function fixRenderingBugs(svgrOutput) {
  return xlinkHrefToHref(svgrOutput);
}

module.exports.transform = function({ src, filename, options }) {
  if (filename.endsWith(".svg")) {
    var jsCode = svgr.sync(src, { native: true });
    return upstreamTransformer.transform({
      src: fixRenderingBugs(jsCode),
      filename,
      options
    });
  }
  return upstreamTransformer.transform({ src, filename, options });
};
