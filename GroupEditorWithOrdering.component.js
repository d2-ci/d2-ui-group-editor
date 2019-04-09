'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IconButton = require('material-ui/IconButton/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _loglevel = require('loglevel');

var _loglevel2 = _interopRequireDefault(_loglevel);

var _GroupEditor = require('./GroupEditor.component');

var _GroupEditor2 = _interopRequireDefault(_GroupEditor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(GroupEditorWithOrdering, _Component);

    function GroupEditorWithOrdering() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, GroupEditorWithOrdering);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = GroupEditorWithOrdering.__proto__ || (0, _getPrototypeOf2.default)(GroupEditorWithOrdering)).call.apply(_ref, [this].concat(args))), _this), _this.setRef = function (r) {
            _this.groupEditor = r;
        }, _this.moveUp = function () {
            if (!Array.isArray(_this.props.assignedItemStore.getState())) {
                return _loglevel2.default.warn('Moving in <GroupEditorWithOrdering /> is not supported (yet) when the assignedItemStore\'s state is a ModelCollectionProperty');
            }

            var currentlySelected = (0, _from2.default)(_this.props.assignedItemStore.getState());
            var itemsToMoveUp = _this.groupEditor.getSelectedItems();

            itemsToMoveUp.forEach(moveItemOneSpotUpIn(currentlySelected));

            // Emit the changed order to the event handler
            _this.props.onOrderChanged(currentlySelected);
        }, _this.moveDown = function () {
            if (!Array.isArray(_this.props.assignedItemStore.getState())) {
                return _loglevel2.default.warn('Moving in <GroupEditorWithOrdering /> is not supported (yet) when the assignedItemStore\'s state is a ModelCollectionProperty');
            }

            var currentlySelected = (0, _from2.default)(_this.props.assignedItemStore.getState());
            var itemsToMoveDown = _this.groupEditor.getSelectedItems();

            itemsToMoveDown.reverse() // Reverse the list to move the items lower in the list first
            .forEach(moveItemOneSpotDownIn(currentlySelected));

            // Emit the changed order to the event handler
            _this.props.onOrderChanged(currentlySelected);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(GroupEditorWithOrdering, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                onOrderChanged = _props.onOrderChanged,
                other = (0, _objectWithoutProperties3.default)(_props, ['onOrderChanged']);


            return _react2.default.createElement(
                'div',
                { style: styles.wrapper },
                _react2.default.createElement(_GroupEditor2.default, (0, _extends3.default)({ ref: this.setRef }, other)),
                _react2.default.createElement(
                    'div',
                    { style: styles.arrowsDiv },
                    _react2.default.createElement(
                        _IconButton2.default,
                        {
                            style: styles.arrow,
                            iconClassName: 'material-icons',
                            tooltip: 'Move up',
                            onClick: this.moveUp
                        },
                        'arrow_upward'
                    ),
                    _react2.default.createElement(
                        _IconButton2.default,
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
}(_react.Component);

GroupEditorWithOrdering.propTypes = {
    onOrderChanged: _propTypes2.default.func,
    assignedItemStore: _propTypes2.default.object.isRequired
};

GroupEditorWithOrdering.defaultProps = {
    onOrderChanged: function onOrderChanged() {}
};

exports.default = GroupEditorWithOrdering;