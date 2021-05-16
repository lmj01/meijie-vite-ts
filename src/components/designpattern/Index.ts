import { testAbstractFactory } from './AbstractFactory';
import { testBuilder } from './Builder';
import { testFactoryMethod } from './FactoryMethod';
import { testPrototype } from './Prototype'
import { testSingleton } from './Singleton'

import { testAdapter } from './Adapter'
import { testBridge } from './Bridge'
import { testComposite } from './Composite'
import { testDecorator } from './Decorator'
import { testFacade } from './Facade'
import { testFlyweight } from './Flyweight'
import { testProxy } from './Proxy'
import { testFilter } from './Filter'

import { testChainOfResponsibility } from './ChainOfResponsibility'
import { testCommand } from './Command'
import { testIterator } from './Iterator'
import { testMediator } from './Mediator'
import { testMemento } from './Memento'
import { testObserver } from './Observer'
import { testState } from './State'
import { testStrategy } from './Strategy'
import { testTemplateMethod } from './TemplateMethod'
import { testVisitor } from './Visitor'

export const creational = {
    testAbstractFactory,
    testFactoryMethod,
    testBuilder,
    testPrototype, 
    testSingleton,
}
export const structural = {
    testAdapter,
    testBridge,
    testComposite,
    testDecorator,
    testFacade,
    testFlyweight,
    testProxy,
    testFilter,
}

export const behavioral = {
    testChainOfResponsibility,
    testCommand,
    testIterator,
    testMediator,
    testMemento,
    testObserver,
    testState,
    testStrategy,
    testTemplateMethod,
    testVisitor,
}