import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Array$from from 'babel-runtime/core-js/array/from';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton/IconButton';
import log from 'loglevel';
import GroupEditor from './GroupEditor.component';

function moveItemOneSpotDownIn(currentlySelected) {
    return function (itemToFind) {
        var indexOfItem = Array.prototype.findIndex.call(currentlySelected, function (item) {
            return item === itemToFind;
        });

        // Can only move the item when the indexOfItem does not refer to the last item
        if (indexOfItem < currentlySelected.length - 1) {
            // Swap the item in the list
            var tempItem = currentlySelected[indexOfItem + 1];
            currentlySelected[indexOfItem + 1] = currentlySelected[indexOfItem];
            currentlySelected[indexOfItem] = tempItem;
        }
    };
}

function moveItemOneSpotUpIn(currentlySelected) {
    return function (itemToFind) {
        var indexOfItem = Array.prototype.findIndex.call(currentlySelected, function (item) {
            return item === itemToFind;
        });

        // Can only move the item when the indexOfItem does not refer to the first item
        if (indexOfItem > 0) {
            // Swap the item in the list
            var tempItem = currentlySelected[indexOfItem - 1];
            currentlySelected[indexOfItem - 1] = currentlySelected[indexOfItem];
            currentlySelected[indexOfItem] = tempItem;
        }
    };
}

var styles = {
    wrapper: {
        paddingRight: '2.5rem',
        position: 'relative'
    },
    arrowsDiv: {
        width: '2.5rem',
        position: 'absolute',
        top: '45%',
        right: 0
    },
    arrow: {
        color: 'rgb(33, 150, 243)'
    }
};

var GroupEditorWithOrdering = function (_Component) {
    _inherits(GroupEditorWithOrdering, _Component);

    function GroupEditorWithOrdering() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, GroupEditorWithOrdering);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GroupEditorWithOrdering.__proto__ || _Object$getPrototypeOf(GroupEditorWithOrdering)).call.apply(_ref, [this].concat(args))), _this), _this.setRef = function (r) {
            _this.groupEditor = r;
        }, _this.moveUp = function () {
            if (!Array.isArray(_this.props.assignedItemStore.getState())) {
                return log.warn('Moving in <GroupEditorWithOrdering /> is not supported (yet) when the assignedItemStore\'s state is a ModelCollectionProperty');
            }

            var currentlySelected = _Array$from(_this.props.assignedItemStore.getState());
            var itemsToMoveUp = _this.groupEditor.getSelectedItems();

            itemsToMoveUp.forEach(moveItemOneSpotUpIn(currentlySelected));

            // Emit the changed order to the event handler
            _this.props.onOrderChanged(currentlySelected);
        }, _this.moveDown = function () {
            if (!Array.isArray(_this.props.assignedItemStore.getState())) {
                return log.warn('Moving in <GroupEditorWithOrdering /> is not supported (yet) when the assignedItemStore\'s state is a ModelCollectionProperty');
            }

            var currentlySelected = _Array$from(_this.props.assignedItemStore.getState());
            var itemsToMoveDown = _this.groupEditor.getSelectedItems();

            itemsToMoveDown.reverse() // Reverse the list to move the items lower in the list first
            .forEach(moveItemOneSpotDownIn(currentlySelected));

            // Emit the changed order to the event handler
            _this.props.onOrderChanged(currentlySelected);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(GroupEditorWithOrdering, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                onOrderChanged = _props.onOrderChanged,
                other = _objectWithoutProperties(_props, ['onOrderChanged']);

            return React.createElement(
                'div',
                { style: styles.wrapper },
                React.createElement(GroupEditor, _extends({ ref: this.setRef }, other)),
                React.createElement(
                    'div',
                    { style: styles.arrowsDiv },
                    React.createElement(
                        IconButton,
                        {
                            style: styles.arrow,
                            iconClassName: 'material-icons',
                            tooltip: 'Move up',
                            onClick: this.moveUp
                        },
                        'arrow_upward'
                    ),
                    React.createElement(
                        IconButton,
                        {
                            style: styles.arrow,
                            iconClassName: 'material-icons',
                            tooltip: 'Move down',
                            onClick: this.moveDown
                        },
                        'arrow_downward'
                    )
                )
            );
        }
    }]);

    return GroupEditorWithOrdering;
}(Component);

GroupEditorWithOrdering.propTypes = {
    onOrderChanged: PropTypes.func,
    assignedItemStore: PropTypes.object.isRequired
};

GroupEditorWithOrdering.defaultProps = {
    onOrderChanged: function onOrderChanged() {}
};

export default GroupEditorWithOrdering;