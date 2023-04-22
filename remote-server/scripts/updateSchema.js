#!/usr/bin/env babel-node --optional es7.asyncFunctions
"use strict";
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const schema_1 = __importDefault(require("../src/schema/schema"));
const graphql_1 = require("graphql");
const utilities_1 = require("graphql/utilities");
// Save JSON of full schema introspection for Babel Relay Plugin to use
(() => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield ((0, graphql_1.graphql)({ schema: schema_1.default, source: (0, utilities_1.getIntrospectionQuery)() }));
    if (result.errors) {
        console.error('ERROR introspecting schema: ', JSON.stringify(result.errors, null, 2));
    }
    else {
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '../data/schema.json'), JSON.stringify(result, null, 2));
        fs_1.default.writeFileSync(path_1.default.join(__dirname, '../../web/data/schema.json'), JSON.stringify(result, null, 2));
        process.exit(0);
    }
}))();
// Save user readable type system shorthand of schema
fs_1.default.writeFileSync(path_1.default.join(__dirname, '../data/schema.graphql'), (0, utilities_1.printSchema)(schema_1.default));
fs_1.default.writeFileSync(path_1.default.join(__dirname, '../../web/data/schema.graphql'), (0, utilities_1.printSchema)(schema_1.default));
