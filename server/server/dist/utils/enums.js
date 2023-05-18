"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteMethod = exports.VoteKind = exports.Role = exports.Place = void 0;
var Place;
(function (Place) {
    Place["main"] = "main";
    Place["waiting"] = "waiting";
    Place["staging"] = "staging";
})(Place = exports.Place || (exports.Place = {}));
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["moderator"] = "moderator";
    Role["user"] = "user";
})(Role = exports.Role || (exports.Role = {}));
var VoteKind;
(function (VoteKind) {
    VoteKind["like"] = "like";
    VoteKind["dislike"] = "dislike";
})(VoteKind = exports.VoteKind || (exports.VoteKind = {}));
var VoteMethod;
(function (VoteMethod) {
    VoteMethod["give"] = "push";
    VoteMethod["take"] = "pull";
})(VoteMethod = exports.VoteMethod || (exports.VoteMethod = {}));
//# sourceMappingURL=enums.js.map