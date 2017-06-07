module.exports = function(target = null, cbAdded, cbRemoved, opts = {}) {

    if (target == null) {
        throw Error('no target given');
    }

    cbAdded   = cbAdded || function() {};
    cbRemoved = cbRemoved || function() {};

    opts.config     = opts.config || {};
    opts.targetNode = opts.targetNode || document.body;

    const defaultConfig = {
        childList    : true,
        characterData: true,
        subtree      : true
    };

    const config = Object.assign({}, defaultConfig, opts.config);
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {

            if (mutation.removedNodes) {
                mutation.removedNodes.forEach((node) => {
                    if (node.matches(target)) {
                        cbRemoved(null, node);
                    }
                })
            }

            if (mutation.addedNodes) {
                mutation.addedNodes.forEach((node) => {
                    if (node.matches(target)) {
                        cbAdded(node, null);
                    }
                })
            }
        });
    });

    observer.observe(opts.targetNode, config);
}
