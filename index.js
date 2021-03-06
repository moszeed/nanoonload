(() => {
    'use strict';

    const defaultConfig = {
        childList: true,
        subtree  : true
    };

    function hasTarget (node = null, target = null) {
        if (node.nodeType !== 1) {
            return false;
        }

        if (typeof target === 'string') {
            return !!node.matches(target);
        }

        return node.isSameNode(target);
    }

    module.exports = function (target = null, cbAdded = () => {}, cbRemoved = () => {}, opts = {}) {
        if (target == null) {
            throw Error('no target given');
        }

        opts.config = opts.config || {};
        opts.targetNode = opts.targetNode || document.body;

        const config = Object.assign({}, defaultConfig, opts.config);
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.removedNodes) {
                    mutation.removedNodes.forEach((node) => {
                        if (hasTarget(node, target)) {
                            cbRemoved(null, node);
                        }
                    });
                }

                if (mutation.addedNodes) {
                    mutation.addedNodes.forEach((node) => {
                        if (hasTarget(node, target)) {
                            cbAdded(node, null);
                        }
                    });
                }
            });
        });

        observer.observe(opts.targetNode, config);
    };
})();